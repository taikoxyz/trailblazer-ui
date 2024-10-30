// src/lib/domains/profile/adapter/ProfileApiAdapter.ts

import { writeContract } from '@wagmi/core';
import { type Address, getAddress, type Hash } from 'viem';

import { registerProfilePictureAbi, registerProfilePictureAddress } from '$generated/abi';
import { profilePictureCache } from '$lib/domains/leaderboard/stores/cache';
import type {
  DomainResponse,
  UserFinalScoreResponse,
  UserHistoryApiResponse,
  UserPointsAndRankResponse,
} from '$lib/domains/profile/dto/profile.dto';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { USER_PROFILE_PICTURE_QUERY, USER_PROFILE_PICTURES_QUERY } from '$lib/shared/services/graphql/queries';
import { pendingTransactions } from '$lib/shared/stores/pendingTransactions';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

import type { UserPointHistory } from '../types/ActivityHistory';

const log = getLogger('ProfileApiAdapter');

export class ProfileApiAdapter {
  /**
   * Fetches user points and rank from the /user/rank endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's points and rank are being fetched for
   * @return {Promise<UserPointsAndRankResponse>} the user's points and rank data
   */
  async fetchUserPointsAndRank(address: Address, season: number): Promise<UserPointsAndRankResponse> {
    const client = getAxiosInstance(season);
    const response = await client.get<UserPointsAndRankResponse>(`/user/rank`, {
      params: { address },
      ...globalAxiosConfig,
    });

    return response.data;
  }

  /**
   * Fetches user activity from the /user/history endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's activity is being fetched for
   * @param {number} [page] the page number of the activity
   * @return {Promise<UserHistoryApiResponse>} the user's activity
   */
  async fetchUserActivity(address: Address, season: number, page?: number): Promise<PaginationInfo<UserPointHistory>> {
    const client = getAxiosInstance(season);
    const params = page ? { address, page } : { address };
    const response = await client.get<UserHistoryApiResponse>(`/user/history`, {
      params,
      ...globalAxiosConfig,
    });
    return normalizeUserHistoryResponse(response.data);
  }

  /**
   * Fetches user domain info from the /user/domain endpoint.
   *
   * @param {Address} address the user's address
   * @return {Promise<DomainResponse>} the user's domain info
   */
  async fetchUserDomainInfo(address: Address): Promise<DomainResponse> {
    const client = getAxiosInstance();
    const response = await client.get<DomainResponse>(`/user/domain`, {
      params: { address },
      ...globalAxiosConfig,
    });
    return response.data;
  }

  /**
   * Sets the user's profile picture in the profilePicture contract.
   *
   * @param {NFT} nft the NFT to set as the user's profile picture
   * @return {Promise<Hash>} the transaction hash
   */
  async setProfilePicture(nft: NFT): Promise<Hash> {
    const txHash = await writeContract(wagmiConfig, {
      abi: registerProfilePictureAbi,
      address: registerProfilePictureAddress[chainId],
      functionName: 'setPFP',
      args: [nft.address, BigInt(nft.tokenId)],
      chainId,
    });

    await pendingTransactions.add(txHash);

    return txHash;
  }

  /**
   * Fetches the user's profile picture from the profilePicture contract.
   * Utilizes caching to improve performance.
   *
   * @param {Address} userAddress the user's address
   * @return {Promise<NFT | null>} the user's profile picture NFT or null if not found
   */
  async getProfilePicture(userAddress: Address): Promise<NFT | null> {
    const checksummedAddress = getAddress(userAddress);

    // Check cache first
    const cachedData = profilePictureCache.getSingle(checksummedAddress);
    if (cachedData !== undefined) {
      log(`Cache hit for profile picture: ${checksummedAddress}`);
      return cachedData;
    }

    try {
      const result = await graphqlClient.query({
        query: USER_PROFILE_PICTURE_QUERY,
        variables: { address: checksummedAddress },
      });

      log('getProfilePicture graphql result', { result });

      if (!result.data.profilePicture) {
        log(`No profile picture found for address: ${checksummedAddress}`);
        profilePictureCache.setSingle(checksummedAddress, null);
        return null;
      }

      const { tokenURI, tokenAddress, tokenId } = result.data.profilePicture;

      const pfp: NFT = {
        address: tokenAddress,
        tokenId: tokenId,
        src: '', // You might want to resolve tokenURI to an actual image URL
        tokenUri: tokenURI,
      };

      // Update cache
      profilePictureCache.setSingle(checksummedAddress, pfp);

      return pfp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error('Error fetching profile picture', { address: checksummedAddress, error: e });
      // Cache the failure to prevent repeated attempts
      profilePictureCache.setSingle(checksummedAddress, null);
      return null;
    }
  }

  /**
   * Fetches multiple profile pictures from the profilePicture contract.
   * Utilizes caching to improve performance.
   *
   * @param {Address[]} addresses the addresses to fetch profile pictures for
   * @return {Promise<Record<Address, NFT | null>>} a record mapping addresses to their profile pictures or null
   */
  async getProfilePictures(addresses: Address[]): Promise<Record<Address, NFT | null>> {
    const normalizedAddresses = addresses.map((addr) => getAddress(addr));
    const cacheKey = normalizedAddresses.sort().join(',');

    // Check if the entire set is cached
    const cachedMultiple = profilePictureCache.getMultiple(normalizedAddresses);
    if (cachedMultiple) {
      log(`Cache hit for multiple profile pictures: [${cacheKey}]`);
      return cachedMultiple;
    }

    // Identify addresses that are not cached
    const fetchedData: Record<string, NFT | null> = {};
    const addressesToFetch = normalizedAddresses.filter((addr) => profilePictureCache.getSingle(addr) === undefined);

    if (addressesToFetch.length > 0) {
      try {
        const result = await graphqlClient.query({
          query: USER_PROFILE_PICTURES_QUERY,
          variables: { addresses: addressesToFetch },
        });

        log('getProfilePictures graphql result', { result });

        if (result.data.profilePictures) {
          for (const item of result.data.profilePictures) {
            const { tokenURI, id: owner, tokenAddress, tokenId } = item;
            const checksummedOwner = getAddress(owner);
            const pfp: NFT = {
              address: tokenAddress,
              tokenId: tokenId,
              src: '',
              tokenUri: tokenURI,
            };
            fetchedData[checksummedOwner] = pfp;
            // Update individual cache
            profilePictureCache.setSingle(checksummedOwner, pfp);
          }
        }

        // For addresses without profile pictures, set to null
        for (const addr of addressesToFetch) {
          if (fetchedData[addr] === undefined) {
            fetchedData[addr] = null;
            profilePictureCache.setSingle(addr, null);
          }
        }
      } catch (e: unknown) {
        console.error('Error fetching multiple profile pictures', { addresses: addressesToFetch, error: e });
        // On error, set all to null to prevent repeated attempts
        for (const addr of addressesToFetch) {
          fetchedData[addr] = null;
          profilePictureCache.setSingle(addr, null);
        }
      }
    }

    const combinedData: Record<string, NFT | null> = {};
    for (const addr of normalizedAddresses) {
      if (fetchedData[addr] !== undefined) {
        combinedData[addr] = fetchedData[addr];
      } else {
        const cachedValue = profilePictureCache.getSingle(addr);
        combinedData[addr] = cachedValue !== undefined ? cachedValue : null;
      }
    }

    profilePictureCache.setMultiple(normalizedAddresses, combinedData);

    return combinedData;
  }

  /**
   * Fetches the user's previous season final scores from the /user/finalscore endpoint.
   *
   *
   * @param {number} season the season the user's final scores are being fetched for
   * @return {Promise<UserFinalScoreResponse>} the user's final scores
   */
  async getPreviousSeasonFinalScores(address: Address, season: number): Promise<UserFinalScoreResponse> {
    const client = getAxiosInstance(season);
    const response = await client.get<UserFinalScoreResponse>(`/user/final`, {
      ...globalAxiosConfig,
      params: { address },
    });
    return response.data;
  }
}

// Helper function to normalize the user history response
const normalizeUserHistoryResponse = (response: UserHistoryApiResponse): PaginationInfo<UserPointHistory> => {
  return 'data' in response ? response.data! : response;
};

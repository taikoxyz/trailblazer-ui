import { gql } from '@apollo/client/core';
import { writeContract } from '@wagmi/core';
import { type Address, getAddress, type Hash } from 'viem';

import { registerProfilePictureAbi, registerProfilePictureAddress } from '$generated/abi';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { pendingTransactions } from '$lib/shared/stores/pendingTransactions';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$libs/util/logger';

import type { DomainResponse, UserPointHistoryPage, UserPointsAndRankResponse } from '../dto/profile.dto';

const log = getLogger('ProfileApiAdapter');
export class ProfileApiAdapter {
  /**
   * Fetches user points and rank from the /user/rank endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's points and rank are being fetched for
   * @return {*}
   * @memberof ProfileApiAdapter
   */
  async fetchUserPointsAndRank(address: Address, season: number) {
    const client = getAxiosInstance(season);
    const response: UserPointsAndRankResponse = await client.get(`/user/rank`, {
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
   * @return {Promise<UserPointHistoryPage>} the user's activity
   * @memberof ProfileApiAdapter
   */
  async fetchUserActivity(address: Address, season: number, page?: number): Promise<UserPointHistoryPage> {
    const client = getAxiosInstance(season);
    const params = page ? { address, page } : { address };
    const response = await client.get(`/user/history`, {
      params,
      ...globalAxiosConfig,
    });
    return response.data;
  }

  /**
   * Fetches user domain info from the /user/domain endpoint.
   *
   * @param {Address} address the user's address
   * @return {Promise<DomainResponse>} the user's domain info
   * @memberof ProfileApiAdapter
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
   * @return {*}  {Promise<string>}
   * @memberof ProfileApiAdapter
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
   *
   * @param {Address} userAddress the user's address
   * @return {Promise<string>} the user's profile picture URL
   * @memberof ProfileApiAdapter
   */
  async getProfilePicture(userAddress: Address): Promise<NFT> {
    try {
      const query = gql`
        query PfpTokenURI($address: String) {
          profilePicture(id: $address) {
            id
            tokenAddress
            tokenId
            tokenURI
          }
        }
      `;

      const result = await graphqlClient.query({
        query,
        variables: { address: getAddress(userAddress) },
      });
      log('getProfilePicture graphql result', { result });
      if (!result.data.profilePicture) {
        throw new Error('GraphQL: No profile picture found');
      }

      const { tokenURI, tokenAddress, tokenId } = result.data.profilePicture;

      const pfp: NFT = {
        address: tokenAddress,
        tokenId: tokenId,
        src: '',
        tokenUri: tokenURI,
      };

      return pfp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.warn(e);
      return {} as NFT;
    }
  }

  /**
   * Fetches multiple profile pictures from the profilePicture contract.
   *
   * @param {Address[]} addresses the addresses to fetch profile pictures for
   * @return {*}  {Promise<Record<Address, NFT>>}
   * @memberof ProfileApiAdapter
   */
  async getProfilePictures(addresses: Address[]): Promise<Record<Address, NFT>> {
    log('getProfilePictures', { addresses });
    try {
      const out: Record<Address, NFT> = {};
      addresses.forEach((address) => {
        out[address] = {} as NFT;
      });

      const query = gql`
        query PfpTokenURI($addresses: [Bytes!]!) {
          profilePictures(where: { id_in: $addresses }) {
            id
            tokenAddress
            tokenId
            tokenURI
          }
        }
      `;

      const result = await graphqlClient.query({
        query,
        variables: { addresses: addresses },
      });

      log('getProfilePictures graphql result', { result });

      if (!result.data.profilePictures) {
        throw new Error('GraphQL: No profile picture found');
      }

      for (const item of result.data.profilePictures) {
        const { tokenURI, id: owner } = item;
        const pfp: NFT = {
          address: item.tokenAddress,
          tokenId: item.tokenId,
          src: '',
          tokenUri: tokenURI,
        };
        log('pfp', pfp);
        out[owner] = pfp;
      }
      log('returning out', out);
      return out;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.warn(e);
      log('getProfilePictures error', { e });
      return {} as Record<Address, NFT>;
    }
  }
}

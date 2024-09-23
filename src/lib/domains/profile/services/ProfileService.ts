import { getAccount } from '@wagmi/core';
import axios from 'axios';
import type { Address } from 'viem';

import { wagmiConfig } from '$lib/domains/wagmi';
import { globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { graphqlClient } from '$libs/graphql/client';
import { USER_NFTS_QUERY } from '$libs/graphql/queries';
import Pfp from '$libs/pfp';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';

import { ProfileApiAdapter } from '../adapter/ProfileAdapter';
import UserRepository from '../repositories/UserRepository';
import { multipliersLoading, profileLoading } from '../stores/profileStore';
import { defaultUserProfile } from '../types/defaultUserProfile';
import type { DomainInfo } from '../types/DomainInfo';
import { DomainType, type UserMultiplier, type UserNFT } from '../types/types';
import type { UserProfile } from '../types/UserProfile';

const log = getLogger('ProfileService');

export class ProfileService {
  private apiAdapter: ProfileApiAdapter;
  private userRepository: UserRepository;

  private localStorageKey = 'taikoENSdomain';

  constructor() {
    this.apiAdapter = new ProfileApiAdapter();
    this.userRepository = new UserRepository();
  }

  /**
   * Fetches the user profile and updates the store.
   * @param address - The user's address.
   * @param season - The season number for data fetching (default is 0).
   */
  async getProfile(address?: Address, season: number = 0): Promise<void> {
    profileLoading.set(true);

    try {
      if (!address) {
        const account = getAccount(wagmiConfig);
        address = account.address;
      }

      if (!address) {
        throw new Error('No address provided and no connected account found.');
      }

      // Fetch data from multiple endpoints
      const [pointsAndRank, userDomainInfo] = await Promise.all([
        this.apiAdapter.fetchUserPointsAndRank(address, season),
        this.apiAdapter.fetchUserDomainInfo(address),
      ]);

      // Assemble the complete UserProfile with default values
      const userProfile: UserProfile = {
        ...defaultUserProfile,
        address,
        personalInfo: {
          ...defaultUserProfile.personalInfo,
        },
        userStats: {
          ...defaultUserProfile.userStats,
          score: pointsAndRank.score,
          rank: pointsAndRank.rank.toString(),
          total: pointsAndRank.total.toString(),
          title: '',
          level: '',
        },
        multipliers: defaultUserProfile.multipliers,
        domainInfo: userDomainInfo,
      };

      log('Assembled User Profile:', userProfile);

      // Save the assembled profile
      await this.userRepository.save(userProfile);

      profileLoading.set(false);
      log('Saved Profile:', await this.userRepository.get());

      // Proceed with fetching NFTs and further calculations
      await this.fetchAndCalculateMultipliers(address);
      await this.fetchAndUpdateAvatar(address);
      await this.performAdditionalCalculations();

      log('Final Profile:', await this.userRepository.get());

      const info: DomainInfo = {
        domainInfo: {
          dotTaiko: userDomainInfo.dotTaiko,
          zns: userDomainInfo.zns,
        },
      };
      // Handle Domain Selection
      await this.handleDomainSelection(info);
    } catch (error) {
      profileLoading.set(false);
      multipliersLoading.set(false);
      log('Error in getProfile:', error);
    }
  }

  /**
   * Handles domain selection logic.
   * @param domainInfo - The fetched domain information.
   */
  async handleDomainSelection(domainInfo: DomainInfo): Promise<void> {
    try {
      const selectedDomain = this.determineSelectedDomain(domainInfo);
      this.setSelectedDomain(selectedDomain);
    } catch (error) {
      log('Error in handleDomainSelection:', error);
    }
  }

  /**
   * Determines the selected domain based on fetched data and localStorage.
   * @param domainInfo - The fetched domain information.
   * @returns The selected domain type.
   */
  determineSelectedDomain(domainInfo: DomainInfo): DomainType {
    const { dotTaiko, zns } = domainInfo.domainInfo;
    const storedDomain = localStorage.getItem(this.localStorageKey) as DomainType | null;

    if (storedDomain === DomainType.DOTTAIKO && dotTaiko) {
      return DomainType.DOTTAIKO;
    }

    if (storedDomain === DomainType.ZNS && zns) {
      return DomainType.ZNS;
    }

    if (dotTaiko && zns) {
      // Randomly select either dotTaiko or zns
      return Math.random() < 0.5 ? DomainType.DOTTAIKO : DomainType.ZNS;
    }

    if (dotTaiko) {
      return DomainType.DOTTAIKO;
    }

    if (zns) {
      return DomainType.ZNS;
    }

    return DomainType.ADDRESS;
  }

  /**
   * Sets the selected domain and persists it in localStorage.
   * @param selectedDomain - The domain type to set.
   */
  async setSelectedDomain(selectedDomain: DomainType): Promise<void> {
    localStorage.setItem(this.localStorageKey, selectedDomain.toString());
    const oldUser = await this.userRepository.get();
    this.userRepository.update({
      ...oldUser,
      domainInfo: {
        ...oldUser.domainInfo,
        selected: selectedDomain,
      },
    });
    log('updated user', await this.userRepository.get());
  }

  /**
   * Allows the user to select a domain and updates the store and localStorage.
   * @param selectedDomain - The domain type selected by the user.
   */
  setSelectedDomainExternally(selectedDomain: DomainType): void {
    this.setSelectedDomain(selectedDomain);
  }

  /**
   * Fetches NFTs and calculates multipliers.
   * @param address - The user's address.
   */
  private async fetchAndCalculateMultipliers(address: Address): Promise<void> {
    try {
      let graphqlResponse;
      if (!isDevelopmentEnv) {
        graphqlResponse = await graphqlClient.query({
          query: USER_NFTS_QUERY,
          variables: { address: address.toLocaleLowerCase() },
        });
      } else {
        const { data } = await axios.get(`/user/graphql`, {
          params: { address },
          ...globalAxiosConfig,
        });
        graphqlResponse = data;
      }

      if (graphqlResponse?.data?.account) {
        const userNFTs: UserNFT[] = graphqlResponse.data.account.s1MultiplierNfts.map(
          (token: { contract: { name: string }; tokenId: string; badgeId: string }) => ({
            name: token.contract.name,
            tokenId: token.tokenId,
            badgeId: token.badgeId,
          }),
        );

        // Calculate Multipliers
        const taikoonCount = userNFTs.filter((nft) => nft.name === 'Taikoon').length;
        const taikoonMultiplier = taikoonCount >= 1 ? 1000 : 0;

        const snaefellCount = userNFTs.filter((nft) => nft.name === 'SnaefellToken').length;
        const snaefellMultiplier = snaefellCount >= 1 ? 100 : 0;

        const factionBadges = userNFTs
          .filter((nft) => nft.name === 'Trailblazers Badges')
          .reduce(
            (acc, nft) => {
              if (nft.badgeId) {
                acc[nft.badgeId] = (acc[nft.badgeId] || 0) + 1;
              }
              return acc;
            },
            {} as Record<string, number>,
          );

        const multiplierTable = [0, 100, 210, 331, 464, 611, 772, 949, 1144];
        const uniqueFactionBadgesCount = Object.keys(factionBadges).length;
        const factionMultiplier = multiplierTable[uniqueFactionBadgesCount] || 0;

        const totalMultiplier = taikoonMultiplier + snaefellMultiplier + factionMultiplier;

        const userMultiplier: UserMultiplier = {
          totalMultiplier: Math.min(Number(totalMultiplier || 0), 2000), // max of 3x
          taikoonMultiplier: Number(taikoonMultiplier || 0),
          factionMultiplier: Number(factionMultiplier || 0),
          snaefellMultiplier: Number(snaefellMultiplier || 0),
        };

        // Update profile with multipliers and NFTs via UserRepository
        await this.userRepository.update({ multipliers: userMultiplier, nfts: userNFTs });
      }
    } catch (error) {
      log('Error in fetchAndCalculateMultipliers:', error);
    }
  }

  /**
   * Fetches and updates the user's avatar.
   * @param address - The user's address.
   */
  private async fetchAndUpdateAvatar(address: Address): Promise<void> {
    try {
      const avatar = await Pfp.get(address as Address);
      await this.userRepository.update({ personalInfo: { avatar } });
    } catch (error) {
      log('Error in fetchAndUpdateAvatar:', error);
      // Optionally, handle errors
    }
  }

  /**
   * Performs additional calculations like percentile, level, and boosted points.
   */
  private async performAdditionalCalculations(): Promise<void> {}
}

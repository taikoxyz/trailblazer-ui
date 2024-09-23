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
import type { UserLevel, UserMultiplier, UserNFT } from '../types/types';
import type { UserProfile } from '../types/UserProfile';

const log = getLogger('ProfileService');

export class ProfileService {
  private apiAdapter: ProfileApiAdapter;
  private userRepository: UserRepository;

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
      const [
        pointsAndRank,
        // userInfo,
        // userActivity,
        // userDomainInfo,
      ] = await Promise.all([
        this.apiAdapter.fetchUserPointsAndRank(address, season),
        // this.apiAdapter.fetchUserInfo(address),
        // this.apiAdapter.fetchUserActivity(address),
        // this.apiAdapter.fetchUserDomainInfo(address),
      ]);

      // Assemble the complete UserProfile with default values
      const userProfile: UserProfile = {
        ...defaultUserProfile,
        address,
        personalInfo: {
          ...defaultUserProfile.personalInfo,
          // ...userInfo,
        },
        userStats: {
          ...defaultUserProfile.userStats,
          score: pointsAndRank.score,
          rank: pointsAndRank.rank.toString(),
          total: pointsAndRank.total.toString(),
          title: '',
          level: '',
        },
        // activityHistory: userActivity,
        multipliers: defaultUserProfile.multipliers,
        // domainInfo: userDomainInfo,
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

      log('Final Profile!:', await this.userRepository.get());
    } catch (error) {
      profileLoading.set(false);
      multipliersLoading.set(false);
      log('Error in getProfile:', error);
      // Optionally, handle errors by setting an error state in another store or notifying the user
    }
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
      // Optionally, handle errors
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
  private async performAdditionalCalculations(): Promise<void> {
    // try {
    //   const profile: UserProfile = await this.userRepository.get();
    //   const rank = profile.userStats.rank;
    //   const total = profile.userStats.total;
    //   const rankPercentile = this.calculatePercentile(rank, total);
    //   const level = this.getLevel(rankPercentile);
    //   const formattedRankPercentile = `${(100 - rankPercentile).toFixed(2)}%`;
    //   const boostedPoints = this.calculateBoostedPoints(profile);
    //   await this.userRepository.update({
    //     userStats: {
    //       ...profile.userStats,
    //       rankPercentile: formattedRankPercentile,
    //       level: level.level,
    //       title: level.title,
    //       boostedPoints,
    //     },
    //   });
    // } catch (error) {
    //   log('Error in performAdditionalCalculations:', error);
    //   // Optionally, handle errors
    // }
  }

  /**
   * Calculates the percentile based on rank and total.
   * @param rank - The user's rank.
   * @param total - The total number of users.
   * @returns The calculated percentile.
   */
  private calculatePercentile(rank: string, total: string): number {
    return (1 - Number(rank) / Number(total)) * 100;
  }

  /**
   * Calculates the boosted points based on the profile.
   * @param profile - The user's profile.
   * @returns The boosted points as a string.
   */
  // private calculateBoostedPoints(profile: UserProfile): string {
  //   // const totalMultiplier = profile.multipliers.totalMultiplier;
  //   // const points = profile.userStats.score;
  //   // return ((points * (totalMultiplier + 1000)) / 1000).toFixed(0);
  // }

  /**
   * Determines the user's level based on their percentile.
   * @param percentile - The user's percentile.
   * @returns An object containing the level and title.
   */
  private getLevel(percentile: number): UserLevel {
    if (percentile < 0 || percentile > 100) {
      return { level: '0', title: 'Beginner' };
    }

    const levelTiers = [
      { percentileCap: 50, level: '0', title: 'Beginner' },
      { percentileCap: 58, level: '1', title: 'Initiate' },
      { percentileCap: 66, level: '2', title: 'Senshi I' },
      { percentileCap: 74, level: '3', title: 'Senshi II' },
      { percentileCap: 82, level: '4', title: 'Samurai I' },
      { percentileCap: 90, level: '5', title: 'Samurai II' },
      { percentileCap: 92, level: '6', title: 'Sensei I' },
      { percentileCap: 94, level: '7', title: 'Sensei II' },
      { percentileCap: 96, level: '8', title: 'Taichou I' },
      { percentileCap: 98, level: '9', title: 'Taichou II' },
      { percentileCap: 99, level: '10', title: 'Shogun' },
      { percentileCap: 99.5, level: '11', title: 'Hashira' },
      { percentileCap: 99.9, level: '12', title: 'Kodai' },
      { percentileCap: 99.99, level: '13', title: 'Densetsu' },
      { percentileCap: 100, level: '14', title: 'Legend' },
    ];

    const tier = levelTiers.find((tier) => percentile <= tier.percentileCap);
    return tier ? { level: String(tier.level), title: tier.title } : { level: '0', title: 'Beginner' };
  }
}

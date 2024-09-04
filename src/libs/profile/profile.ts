import { getAccount } from '@wagmi/core';
import axios from 'axios';
import { get } from 'svelte/store';
import type { Address } from 'viem';

// import type { Address } from 'viem';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import { graphqlClient } from '$libs/graphql/client';
import { USER_NFTS_QUERY } from '$libs/graphql/queries';
import Pfp from '$libs/pfp';
// import getMovement from '$libs/badges/getMovement';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { wagmiConfig } from '$libs/wagmi';
import { boosterLoading, profileLoading } from '$stores/load';
import { currentProfile } from '$stores/profile';

import type { UserLevel, UserMultiplier, UserNFT, UserPointHistoryPage, UserProfile } from './types';

const log = getLogger('Profile');

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export class Profile {
  static getLevel(percentile: number): UserLevel {
    if (percentile < 0 || percentile > 100) {
      return { level: '0', title: 'Beginner' };
    }

    const levelTiers = [
      {
        percentileCap: 50,
        level: '0',
        title: 'Beginner',
      },
      {
        percentileCap: 58,
        level: '1',
        title: 'Initiate',
      },
      {
        percentileCap: 66,
        level: '2',
        title: 'Senshi I',
      },
      {
        percentileCap: 74,
        level: '3',
        title: 'Senshi II',
      },
      {
        percentileCap: 82,
        level: '4',
        title: 'Samurai I',
      },
      {
        percentileCap: 90,
        level: '5',
        title: 'Samurai II',
      },
      {
        percentileCap: 92,
        level: '6',
        title: 'Sensei I',
      },
      {
        percentileCap: 94,
        level: '7',
        title: 'Sensei II',
      },
      {
        percentileCap: 96,
        level: '8',
        title: 'Taichou I',
      },
      {
        percentileCap: 98,
        level: '9',
        title: 'Taichou II',
      },
      {
        percentileCap: 99,
        level: '10',
        title: 'Shogun',
      },
      {
        percentileCap: 99.5,
        level: '11',
        title: 'Hashira',
      },
      {
        percentileCap: 99.9,
        level: '12',
        title: 'Kodai',
      },
      {
        percentileCap: 99.99,
        level: '13',
        title: 'Densetsu',
      },
      {
        percentileCap: 100,
        level: '14',
        title: 'Legend',
      },
    ];
    // 0-20 percentile will have the Beginner Title
    const { level, title } = levelTiers.find((tier) => percentile <= tier.percentileCap) as UserLevel;
    return { level: String(level), title };
  }

  static async getProfile(address?: string) {
    profileLoading.set(true);
    // Mock Data
    // setInterval(() => {
    //   currentProfile.set(MOCK_PROFILE_2);
    // }, 5000)

    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      const { data } = await axios.get(`${baseApiUrl}/user/rank`, { params: { address }, ...globalAxiosConfig });
      const userProfile: UserProfile = data as UserProfile;

      log('User Profile: ', userProfile);

      // Safely update the currentProfile with userProfile details
      currentProfile.update((current) => {
        const updates: Partial<UserProfile> = {};

        updates.address = address;
        (Object.keys(userProfile) as Array<keyof UserProfile>).forEach((key) => {
          const userValue = userProfile[key];
          if (userValue !== undefined) {
            updates[key] = userValue as never;
          }
        });
        return { ...current, ...updates };
      });
      profileLoading.set(false);
      log('Updated Profile: ', get(currentProfile));

      // Get Multipliers and NFT Inventory
      let graphqlResponse;
      if (!isDevelopmentEnv) {
        graphqlResponse = await graphqlClient.query({
          query: USER_NFTS_QUERY,
          variables: { address: address.toLocaleLowerCase() },
        });
      } else {
        const { data } = await axios.get(`${baseApiUrl}/user/graphql`, { params: { address }, ...globalAxiosConfig });
        graphqlResponse = data;
      }

      if (graphqlResponse?.data?.owner) {
        const userNFTs: UserNFT[] = graphqlResponse.data.owner.ownedTokens.map(
          (token: { contract: { name: string }; tokenId: string; badgeId: string }) => ({
            name: token.contract.name,
            tokenId: token.tokenId,
            badgeId: token.badgeId,
          }),
        );

        // Get Count of Taikoons, where userNFTs.name === "Taikoon"
        const taikoonCount = userNFTs.filter((nft) => nft.name === 'Taikoon').length;
        // If count of taikoon >= 1, taikoonMultiplier = 1000, else 0
        const taikoonMultiplier = taikoonCount >= 1 ? 1000 : 0;
        // Get Count of snaefell tokens, where userNFTs.name === "SnaefellToken"
        const snaefellCount = userNFTs.filter((nft) => nft.name === 'SnaefellToken').length;
        // If count of snaefell >= 1, snaefellMultiplier = 100, else 0
        const snaefellMultiplier = snaefellCount >= 1 ? 100 : 0;

        // Get Count of Faction Token per badge id, where userNFTs.name === "Trailblazers Badges"
        // Group faction badge according to badge id in a Record
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
        // Calculate faction multiplier based on unique faction badges
        const uniqueFactionBadgesCount = Object.keys(factionBadges).length;
        const factionMultiplier = multiplierTable[uniqueFactionBadgesCount] || 0;

        // Calculate total multiplier (sum of all multipliers)
        const totalMultiplier = taikoonMultiplier + snaefellMultiplier + factionMultiplier;

        const userMultiplier: UserMultiplier = {
          totalMultiplier: Math.min(Number(totalMultiplier || 0), 2000), // max of 3x
          taikoonMultiplier: Number(taikoonMultiplier || 0),
          factionMultiplier: Number(factionMultiplier || 0),
          snaefellMultiplier: Number(snaefellMultiplier || 0),
        };

        // PFP/Avatar time
        const avatar = await Pfp.get(address as Address);

        // Update profile
        currentProfile.update((current) => {
          return { ...current, avatar, multipliers: userMultiplier, nfts: userNFTs };
        });
      }
      boosterLoading.set(false);

      /* re-enable when movements (based vs boosted) becomes available
      // Get the movement (neutral vs based vs boosted)
      const movement = await getMovement(address as Address);

      // update the movement
      currentProfile.update((current) => {
        return { ...current, movement };
      });
      log('Updated Profile with Movement: ', get(currentProfile));
      */

      // Calculate Percentile
      const profile = get(currentProfile);
      const rank = profile.rank;
      const total = profile.total;
      const rankPercentile = this.calculatePercentile(rank, total);
      log('Rank Percentile: ', rankPercentile);

      // Calculate Level
      const level = this.getLevel(rankPercentile);
      log('Level: ', level);

      // Format rankPercentile to 2 decimal places and add suffix
      const formattedRankPercentile = `${(100 - rankPercentile).toFixed(2)}%`;
      log('Formatted', formattedRankPercentile);

      // Calculate Boosted Points
      const boostedPoints = this.calculateBoostedPoints();

      // Update Profile
      currentProfile.update((current) => {
        return { ...current, ...level, rankPercentile: formattedRankPercentile, boostedPoints: boostedPoints };
      });

      log('Final Profile: ', get(currentProfile));
    }
  }

  static async getUserPointsHistory(address?: string, page?: number) {
    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (!page) {
      page = 0;
    }

    if (address) {
      const response = await axios.get(`${baseApiUrl}/user/history`, {
        params: { address, page },
      });
      const pointsHistory: UserPointHistoryPage = response.data as UserPointHistoryPage;

      // Safely update the currentProfile with userProfile details
      currentProfile.update((current) => {
        return { ...current, pointsHistory };
      });
    }
  }
  static async getStatistics() {
    // fetches statistics from backend
  }

  static calculatePercentile(rank: string | number, total: string | number) {
    // Take current rank over total

    const percentile = (1 - Number(rank) / Number(total)) * 100;
    return percentile || 0;
  }

  static calculateBoostedPoints() {
    const profile = get(currentProfile);
    const totalMultiplier = profile.multipliers.totalMultiplier;
    const points = profile.score;
    const boostedPoints = ((points * (totalMultiplier + 1000)) / 1000).toFixed(0);
    return boostedPoints;
  }
}

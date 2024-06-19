import { getAccount } from '@wagmi/core';
import { get } from 'svelte/store';
import type { Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import getMovement from '$libs/badges/getMovement';
import { wagmiConfig } from '$libs/wagmi';
import { currentProfile } from '$stores/profile';
import type { IToDo } from '$types';

import type { UserLevel, UserPointHistoryPage, UserProfile } from './types';

export class Profile {
  static getLevel(percentile: number): UserLevel {
    if (percentile < 0 || percentile > 100) {
      return { level: 0, title: 'Beginner' };
    }

    const levelTiers = [
      {
        percentileCap: 20,
        level: 0,
        title: 'Beginner',
      },
      {
        percentileCap: 25,
        level: 1,
        title: 'Initiate',
      },
      {
        percentileCap: 30,
        level: 2,
        title: 'Senshi I',
      },
      {
        percentileCap: 35,
        level: 3,
        title: 'Senshi II',
      },
      {
        percentileCap: 40,
        level: 4,
        title: 'Samurai I',
      },
      {
        percentileCap: 45,
        level: 5,
        title: 'Samurai II',
      },
      {
        percentileCap: 50,
        level: 6,
        title: 'Sensei I',
      },
      {
        percentileCap: 94,
        level: 7,
        title: 'Sensei II',
      },
      {
        percentileCap: 96,
        level: 8,
        title: 'Taichou I',
      },
      {
        percentileCap: 98,
        level: 9,
        title: 'Taichou II',
      },
      {
        percentileCap: 99,
        level: 10,
        title: 'Shogun',
      },
      {
        percentileCap: 99.5,
        level: 11,
        title: 'Hashira',
      },
      {
        percentileCap: 99.8,
        level: 12,
        title: 'Kodai',
      },
      {
        percentileCap: 99.9,
        level: 13,
        title: 'Densetsu',
      },
      {
        percentileCap: 100,
        level: 14,
        title: 'Legend',
      },
    ];

    // 0-20 percentile will have the Beginner Title
    const level = levelTiers.find((tier) => percentile <= tier.percentileCap) as UserLevel;
    return { level: level.level, title: level.title };
  }

  static async getProfile(address?: string) {
    // Mock Data
    // setInterval(() => {
    //   currentProfile.set(MOCK_PROFILE_2);
    // }, 5000)

    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      // TOOO: Update this
      const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?address=${address}`);
      // const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?user=0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`)
      const userProfile: UserProfile = (await response.json()) as UserProfile;
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

      // Get the movement (neutral vs based vs boosted)
      const movement = await getMovement(address as Address);

      // update the movement
      currentProfile.update((current) => {
        return { ...current, movement };
      });

      // Calculate Percentile
      const rankPercentile = this.calculatePercentile();

      // Calculate Level
      const level = this.getLevel(rankPercentile);

      // Format rankPercentile to 2 decimal places and add suffix
      const formattedRankPercentile = `${(100 - rankPercentile).toFixed(2)}%`;

      // Update Profile
      currentProfile.update((current: IToDo) => {
        return { ...current, ...level, rankPercentile: formattedRankPercentile };
      });
    }
  }

  static async getUserPointsHistory(address?: string) {
    // Mock Data
    // setInterval(() => {
    //   userPointHistory.set(MOCK_USER_POINT_HISTORY);
    // }, 100)

    // Get current page for user transactions

    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/userhistory?user=${address}`);
      const pointsHistory: UserPointHistoryPage = (await response.json()) as UserPointHistoryPage;

      // Safely update the currentProfile with userProfile details
      currentProfile.update((current) => {
        return { ...current, pointsHistory };
      });
    }
  }

  static async getStatistics() {
    // fetches statistics from backend
  }

  static calculatePercentile() {
    // Take current rank over total
    const profile = get(currentProfile);
    const rank = profile.rank;
    const total = profile.total;
    const percentile = (1 - Number(rank) / Number(total)) * 100;
    return percentile;
  }
}

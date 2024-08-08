import { getAccount } from '@wagmi/core';
import axios from 'axios';
import { get } from 'svelte/store';

// import type { Address } from 'viem';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
// import getMovement from '$libs/badges/getMovement';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';
import { wagmiConfig } from '$libs/wagmi';
import { currentProfile } from '$stores/profile';

import type { UserLevel, UserPointHistoryPage, UserProfile } from './types';

const log = getLogger('Profile');

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export class Profile {
  static getLevel(percentile: number): UserLevel {
    if (percentile < 0 || percentile > 100) {
      return { level: 0, title: 'Beginner' };
    }

    const levelTiers = [
      {
        percentileCap: 50,
        level: 0,
        title: 'Beginner',
      },
      {
        percentileCap: 58,
        level: 1,
        title: 'Initiate',
      },
      {
        percentileCap: 66,
        level: 2,
        title: 'Senshi I',
      },
      {
        percentileCap: 74,
        level: 3,
        title: 'Senshi II',
      },
      {
        percentileCap: 82,
        level: 4,
        title: 'Samurai I',
      },
      {
        percentileCap: 90,
        level: 5,
        title: 'Samurai II',
      },
      {
        percentileCap: 92,
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
        percentileCap: 99.9,
        level: 12,
        title: 'Kodai',
      },
      {
        percentileCap: 99.99,
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
    const { level, title } = levelTiers.find((tier) => percentile <= tier.percentileCap) as UserLevel;
    return { level, title };
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
      log('Updated Profile: ', get(currentProfile));

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
      const rankPercentile = this.calculatePercentile();
      log('Rank Percentile: ', rankPercentile);

      // Calculate Level
      const level = this.getLevel(rankPercentile);
      log('Level: ', level);

      // Format rankPercentile to 2 decimal places and add suffix
      const formattedRankPercentile = `${(100 - rankPercentile).toFixed(2)}%`;
      log('Formatted', formattedRankPercentile);

      // Update Profile
      currentProfile.update((current) => {
        return { ...current, ...level, rankPercentile: formattedRankPercentile };
      });
      log('Final Profile: ', get(currentProfile));
    }
  }

  static async getUserPointsHistory(address?: string) {
    if (!address) {
      address = getAccount(wagmiConfig).address;
    }

    if (address) {
      const response = await axios.get(`${baseApiUrl}/user/history`, {
        params: { address: address },
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

  static calculatePercentile() {
    // Take current rank over total
    const profile = get(currentProfile);
    const rank = profile.rank;
    const total = profile.total;
    const percentile = (1 - Number(rank) / Number(total)) * 100;
    return percentile || 0;
  }
}

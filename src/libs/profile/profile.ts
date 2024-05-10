import { getAccount } from '@wagmi/core';
import { MOCK_PROFILE_2 } from 'src/tests/mocks/profile';
import { MOCK_USER_POINT_HISTORY } from 'src/tests/mocks/userPointHistory';
import { get } from 'svelte/store';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { config } from '$libs/wagmi';
import { currentProfile } from '$stores/profile';
import { userPointHistory } from '$stores/userPointHistory';

import type { UserPointHistoryPage, UserProfile } from './types';

export class Profile {
  static async getProfile() {
    // Mock Data
    // setInterval(() => {
    //   currentProfile.set(MOCK_PROFILE_2);
    // }, 5000)

    const account = getAccount(config);
    if (account?.address) {
      // TOOO: Update this
      const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?user=${account.address}`);
      // const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/user?user=0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`)
      const userProfile: UserProfile = (await response.json()) as UserProfile;
      console.log('🚀 | Profile | getProfile | userProfile:', userProfile);

      // Safely update the currentProfile with userProfile details
      currentProfile.update((current) => {
        const updates: Partial<UserProfile> = {};
        (Object.keys(userProfile) as Array<keyof UserProfile>).forEach((key) => {
          const userValue = userProfile[key];
          if (userValue !== undefined) {
            updates[key] = userValue as never;
          }
        });
        return { ...current, ...updates };
      });

      userPointHistory.set(userProfile.pointsHistory);

      // set page
    }
  }

  static async getUserPointsHistory() {
    // Mock Data
    // setInterval(() => {
    //   userPointHistory.set(MOCK_USER_POINT_HISTORY);
    // }, 100)

    // Get current page for user transactions

    const account = getAccount(config);
    if (account?.address) {
      const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/userhistory?user=${account.address}`);
      const pointsHistory: UserPointHistoryPage = (await response.json()) as UserPointHistoryPage;

      // Safely update the currentProfile with userProfile details
      currentProfile.update((current) => {
        return { ...current, pointsHistory };
      });
    }

    console.log(get(currentProfile));
  }

  static async getStatistics() {
    // fetches statistics from backend
  }
}

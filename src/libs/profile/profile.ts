import { getAccount } from '@wagmi/core';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { wagmiConfig } from '$libs/wagmi';
import { currentProfile } from '$stores/profile';

import type { UserPointHistoryPage, UserProfile } from './types';

export class Profile {
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

      // userPointHistory.set(userProfile.pointsHistory);

      // set page
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
}

// src/lib/domains/profile/repositories/UserRepository.ts
import { get } from 'svelte/store';
import { zeroAddress } from 'viem';

import { getLogger } from '$libs/util/logger';

import { userProfile } from '../stores/profileStore';
import type { UserProfile } from '../types/UserProfile';

const log = getLogger('UserRepository');

export default class UserRepository {
  /**
   * Saves the user profile to the store.
   * @param profile - The user profile data to save.
   */
  async save(profile: UserProfile): Promise<void> {
    log('Saving user profile:', userProfile);
    userProfile.set(profile);
  }

  /**
   * Retrieves the user profile from the store.
   * @returns The current user profile.
   */
  async get(): Promise<UserProfile> {
    const profile = get(userProfile);
    log('Getting user profile:', profile);
    return profile;
  }

  /**
   * Updates the user profile in the store.
   * @param profile - The user profile data to update.
   */
  async update(profile: Partial<UserProfile>): Promise<void> {
    log('Updating user profile:', profile);
    userProfile.update((current) => {
      return { ...current, ...profile };
    });
  }

  /**
   * Deletes the user profile from the store by resetting it to default values.
   */
  async delete(): Promise<void> {
    log('Deleting user profile.');
    userProfile.set({
      address: zeroAddress,
      personalInfo: {
        name: undefined,
        ens: undefined,
        avatar: undefined,
      },
      userStats: {
        score: 0,
        rank: '0',
        title: '',
        level: '0',
        total: '0',
        rankPercentile: undefined,
      },
      activityHistory: {
        pointsHistory: undefined,
      },
      multipliers: {
        totalMultiplier: 0,
        taikoonMultiplier: 0,
        factionMultiplier: 0,
        snaefellMultiplier: 0,
      },
      nfts: [],
      domainInfo: {
        selected: undefined,
        dotTaiko: undefined,
        zns: undefined,
      },
    });
  }
}

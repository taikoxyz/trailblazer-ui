import { get } from 'svelte/store';

import { userProfile } from '$lib/domains/profile/stores/profileStore';
import type { UserProfile } from '$lib/domains/profile/types/UserProfile';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('UserRepository');

export default class UserRepository {
  /**
   * Saves the user profile to the store.
   * @param profile - The user profile data to save.
   */
  async save(profile: UserProfile): Promise<void> {
    log('Saving user profile:', userProfile);
    3;
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
}

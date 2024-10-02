import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isAddress } from 'viem';

import { browser } from '$app/environment';
import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { activeSeason } from '$lib/shared/stores/activeSeason';
import { getLogger } from '$libs/util/logger.js';

const log = getLogger('profile:page');

export const load = async ({ params }) => {
  const { address } = params;

  if (!address || !isAddress(address)) {
    log('Invalid address', address);
    throw redirect(302, '/profile');
  }

  log('Fetching profile data', address);
  if (browser) {
    try {
      await profileService.getProfile(address, get(activeSeason));
    } catch (e) {
      console.error(e);
    }
  }
};

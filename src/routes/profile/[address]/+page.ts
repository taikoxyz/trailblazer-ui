import { redirect } from '@sveltejs/kit';
import { isAddress } from 'viem';

import { browser } from '$app/environment';
import { Profile } from '$libs/profile';
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
    const loadProfile = Profile.getProfile(address);
    const loadHistory = Profile.getUserPointsHistory(address);
    await Promise.all([loadProfile, loadHistory]);
  }
};

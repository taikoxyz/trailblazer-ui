import { redirect } from '@sveltejs/kit';
import { type Address, isAddress } from 'viem';

import { Profile } from '$libs/profile';
import { getLogger } from '$libs/util/logger.js';

const log = getLogger('profile:page');

export const load = async ({ params }) => {
  const { address } = params;

  if (!address || !isAddress(address)) {
    throw redirect(302, '/profile');
  }

  const fetchProfileData = async (address: Address) => {
    log('Fetching profile data', address);
    const loadProfile = Profile.getProfile(address);
    const loadHistory = Profile.getUserPointsHistory(address);
    await Promise.all([loadProfile, loadHistory]);
  };

  await fetchProfileData(address as Address);
};

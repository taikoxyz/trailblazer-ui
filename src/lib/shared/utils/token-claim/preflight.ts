import axios from 'axios';
import { get } from 'svelte/store';
import type { Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { activeSeason } from '$shared/stores/activeSeason';

import type { ITokenClaimPreflight } from './types';

export default async function preflight(address: Address): Promise<ITokenClaimPreflight> {
  const blacklisted = await profileService.getBlacklistStatus(address, get(activeSeason));
  if (blacklisted) {
    throw new Error('You are blacklisted');
  }
  const url = `${PUBLIC_TRAILBLAZER_API_URL}/claim/proof`;
  const res = await axios.get(url, {
    params: {
      address: address,
    },
    ...globalAxiosConfig,
  });

  const { value, proof } = res.data;
  return { address, value: parseFloat(value || '0'), proof };
}

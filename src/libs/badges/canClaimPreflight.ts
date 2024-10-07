import axios from 'axios';
import type { Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

export default async function canClaimPreflight(address: Address, badgeId: number): Promise<boolean> {
  if (isDevelopmentEnv) {
    return true;
  }

  try {
    const url = `${PUBLIC_TRAILBLAZER_API_URL}/faction/whitelist`;
    const res = await axios.get(url, {
      params: {
        address: address,
        badgeId: badgeId,
      },
      ...globalAxiosConfig,
    });
    const json = res.data;

    return json && json.whitelisted;
  } catch (e) {
    console.error('Error fetching claim preflight:', e);
    return false;
  }
}

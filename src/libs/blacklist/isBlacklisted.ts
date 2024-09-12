import axios from 'axios';
import type { Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import type { RankApiResponse } from '$libs/profile';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { getLogger } from '$libs/util/logger';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const log = getLogger('blacklist');

export const isBlacklisted = async (user: Address) => {
  log('Checking blacklist', user);

  try {
    const { data } = await axios.get<RankApiResponse>(`${baseApiUrl}/user/rank`, {
      params: { address: user },
      ...globalAxiosConfig,
    });
    if (data.blacklisted) {
      log('Blacklisted account detected', user);
      return true;
    }
  } catch (error) {
    console.error('Error checking blacklist', error);
    return false;
  }
  return false;
};

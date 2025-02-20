import { get } from 'svelte/store';

import { apiConfig } from '$config';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { activeSeason } from '$lib/shared/stores/activeSeason';
import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const getBaseSeasonURL = (season: number = get(activeSeason)) => `${baseApiUrl}/s${season}`;

export const getSeasonApiUrl = (season: number = get(activeSeason)) =>
  season === 1 ? baseApiUrl : getBaseSeasonURL(season);

const globalFetchConfig: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const fetchFromApi = async <T>(
  url: string,
  season: number = get(activeSeason),
  options: RequestInit = {},
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

  const builtUrl = `${getSeasonApiUrl(season)}${url}`;
  try {
    const response = await fetch(builtUrl, {
      ...globalFetchConfig,
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
};

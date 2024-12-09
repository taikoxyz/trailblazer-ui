import type { AxiosRequestConfig } from 'axios';
import axios, { type AxiosInstance } from 'axios';
import { get } from 'svelte/store';

import { apiConfig } from '$config';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { activeSeason } from '$lib/shared/stores/activeSeason';
import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

const getBaseSeasonURL = (season: number = get(activeSeason)) => {
  return `${baseApiUrl}/s${season}`;
};

export const getSeasonApiUrl = (season: number = get(activeSeason)) => {
  if (season === 1) {
    return baseApiUrl;
  } else {
    return getBaseSeasonURL(season);
  }
};

export const globalAxiosConfig: AxiosRequestConfig = {
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

// get dynamic instance based on passed season
export const getAxiosInstance = (season: number = get(activeSeason)): AxiosInstance => {
  return axios.create({
    baseURL: getSeasonApiUrl(season),
    ...globalAxiosConfig,
  });
};

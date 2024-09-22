import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

import { activeSeason } from './activeSeason';

const baseApiUrl = isDevelopmentEnv ? '/api/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export const baseSeasonURL = `${baseApiUrl}/s${activeSeason}`;

export const getSeasonApiUrl = (season: number = parseInt(activeSeason)) => {
  if (season === 1) {
    return baseApiUrl;
  } else {
    return baseSeasonURL;
  }
};

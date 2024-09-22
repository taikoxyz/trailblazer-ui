import axios from 'axios';
import type { Address } from 'viem';

import { getSeasonApiUrl } from '$libs/api/config/baseApiUrl';
import type { UserPointsAndRank } from '$libs/api/dto';

export type GetUserPointsAndRankParams = {
  address: Address;
  season: number;
};

export const getUserPointsAndRank = async ({
  address,
  season,
}: GetUserPointsAndRankParams): Promise<UserPointsAndRank> => {
  try {
    const url = getSeasonApiUrl(season) + '/user/rank';

    const response = await axios.get<UserPointsAndRank>(url, {
      params: { address },
    });

    return response.data;
  } catch (error) {
    console.error(`Error getting points and rank for address ${address}:`, error);
    throw error;
  }
};

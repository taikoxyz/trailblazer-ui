import type { Address } from 'viem';

import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$libs/util/logger';

import type { BonusDTO } from '../dto/bonus.dto';

const log = getLogger('SeasonBonusPointsAdapter');

export class SeasonBonusPointsAdapter {
  /**
   * Fetches the user's bonus points from the /user/bonus endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's bonus points are being fetched for
   * @return {*}  {Promise<number>}
   * @memberof ProfileApiAdapter
   */
  async fetchUserBonusPoints(address: Address, season: number): Promise<number> {
    const client = getAxiosInstance(season);
    const response = await client.get<BonusDTO>(`/user/bonus`, {
      params: { address },
      ...globalAxiosConfig,
    });

    return response.data.value;
  }

  /**
   * Claims the user's bonus points
   *
   * @param {Address} address
   * @param {number} season
   * @memberof ProfileApiAdapter
   */
  async claimUserBonusPoints(address: Address, season: number) {
    log('claimUserBonusPoints', { address, season });
    throw new Error('Not implemented');
  }
}

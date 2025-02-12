import type { CommonPageApiResponse, PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

import type { LiquidityLeaderboardPageApiResponse } from '../dto/liqudity.dto';
import type { CexCompetitionRow } from '../types/cex/types';

const log = getLogger('CexCompetitionAdapter');

export class CexCompetitionAdapter {
  /**
   * Fetches leaderboard data from the /leaderboard/competition/tradingcarnival endpoint.
   *
   * @param {PaginationInfo<CexCompetitionRow>} args
   * @param {number} season
   * @return {*}  {Promise<PaginationInfo<CexCompetitionRow>>}
   * @memberof CexCompetitionAdapter
   */
  async fetchLeaderboardData(
    args: PaginationInfo<CexCompetitionRow>,
    season: number,
  ): Promise<CommonPageApiResponse<CexCompetitionRow>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get<LiquidityLeaderboardPageApiResponse>(`/leaderboard/competition/tradingcarnival`, {
      ...globalAxiosConfig,
      params: args,
    });

    return {
      ...response.data,
      lastUpdated: response.data.lastUpdated * 1000,
    } satisfies CommonPageApiResponse<CexCompetitionRow>;
  }

  /**
   *  Fetches the data for a single exchange from the /leaderboard/competition/tradingcarnival endpoint
   *
   * @param {PaginationInfo<>} args
   * @param {number} season
   * @param {string} address
   * @return {*}  {Promise<PaginationInfo<CexCompetitionRow>>}
   * @memberof CexCompetitionAdapter
   */
  async fetchLeaderboardPositionForAddress(
    season: number,
    exchange: string,
  ): Promise<PaginationInfo<CexCompetitionRow>> {
    log('fetching leaderboard data', season, exchange);
    const client = getAxiosInstance(season);
    const response = await client.get('/leaderboard/competition/tradingcarnival', {
      ...globalAxiosConfig,
      params: { name: exchange },
    });
    log('cexLeaderboardPosition', response.data.data);

    return response.data.data;
  }
}

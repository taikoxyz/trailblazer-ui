import type { CommonPageApiResponse, PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

import type { CexLeaderboardPageApiResponse } from '../dto/cex.dto';
import type { CexCompetitionRow, CexCompetitionType } from '../types/cex/types';

const log = getLogger('CexCompetitionAdapter');

export class CexCompetitionAdapter {
  /**
   * Fetches leaderboard data from the /leaderboard/competition/tradingcarnival endpoint.
   *
   * @param {PaginationInfo<CexCompetitionRow>} args
   * @param {CexCompetitionType} type of competition
   * @param {number} season
   * @return {*}  {Promise<PaginationInfo<CexCompetitionRow>>}
   * @memberof CexCompetitionAdapter
   */
  async fetchLeaderboardData(
    args: PaginationInfo<CexCompetitionRow>,
    type: CexCompetitionType,
    season: number,
  ): Promise<CommonPageApiResponse<CexCompetitionRow>> {
    try {
      log('fetching leaderboard data', args, season);
      const client = getAxiosInstance(season);
      const response = await client.get<CexLeaderboardPageApiResponse>(`/v2/leaderboard/competition/cex/${type}`, {
        ...globalAxiosConfig,
        params: args,
      });
      log('cexLeaderboardData', response.data);
      return {
        ...response.data,
        lastUpdated: response.data.lastUpdated * 1000,
      } satisfies CommonPageApiResponse<CexCompetitionRow>;
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
      return {
        data: {
          page: 0,
          size: 0,
          total: 0,
          items: [],
        },
        lastUpdated: Date.now(),
      } satisfies CommonPageApiResponse<CexCompetitionRow>;
    }
  }

  /**
   *  Fetches the data for a single exchange from the /leaderboard/competition/tradingcarnival endpoint
   *
   * @param {PaginationInfo<>} args
   * @param {number} season
   * @param {CexCompetitionType} type of competition
   * @param {string} address
   * @return {*}  {Promise<PaginationInfo<CexCompetitionRow>>}
   * @memberof CexCompetitionAdapter
   */
  async fetchLeaderboardPositionForAddress(
    season: number,
    type: CexCompetitionType,
    exchange: string,
  ): Promise<PaginationInfo<CexCompetitionRow>> {
    log('fetching leaderboard data', season, exchange);
    const client = getAxiosInstance(season);
    const response = await client.get(`/v2/leaderboard/competition/cex/${type}`, {
      ...globalAxiosConfig,
      params: { name: exchange },
    });
    log('cexLeaderboardPosition', response.data.data);

    return response.data.data;
  }
}

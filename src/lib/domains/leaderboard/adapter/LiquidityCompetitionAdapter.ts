import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { CommonPageApiResponse, PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

import type { LiquidityLeaderboardPageApiResponse } from '../dto/liqudity.dto';

const log = getLogger('LiquidityCompetitionAdapter');

export class LiquidityCompetitionAdapter {
  /**
   * Fetches leaderboard data from the /leaderboard/competition/liquidity endpoint.
   *
   * @param {PaginationInfo<UserLeaderboardItem>} args
   * @param {number} season
   * @return {*}  {Promise<PaginationInfo<UserLeaderboardItem>>}
   * @memberof LiquidityCompetitionAdapter
   */
  async fetchLeaderboardData(
    args: PaginationInfo<UserLeaderboardItem>,
    season: number,
  ): Promise<CommonPageApiResponse<UserLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get<LiquidityLeaderboardPageApiResponse>(`/v2/leaderboard/competition/liquidity`, {
      ...globalAxiosConfig,
      params: args,
    });

    return {
      ...response.data,
      lastUpdated: response.data.lastUpdated * 1000,
    } satisfies CommonPageApiResponse<UserLeaderboardItem>;
  }

  /**
   *  Fetches the data for a single user from the /leaderboard/competition/liquidity endpoint
   *
   * @param {PaginationInfo<UserLeaderboardItem>} args
   * @param {number} season
   * @param {string} address
   * @return {*}  {Promise<PaginationInfo<UserLeaderboardItem>>}
   * @memberof LiquidityCompetitionAdapter
   */
  async fetchLeaderboardPositionForAddress(
    season: number,
    address: string,
  ): Promise<PaginationInfo<UserLeaderboardItem>> {
    log('fetching user leaderboard data', season, address);
    const client = getAxiosInstance(season);
    const response = await client.get('/v2/leaderboard/competition/liquidity', {
      ...globalAxiosConfig,
      params: { address },
    });
    log('userLeaderboardData', response.data.data);

    return response.data.data;
  }
}

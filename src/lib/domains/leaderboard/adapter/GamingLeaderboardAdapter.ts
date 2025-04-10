import type { GamingLeaderboardItem, GamingLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/gaming.dto';
import type { CommonPageApiResponse, PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('GamingLeaderboardAdapter');

export class GamingLeaderboardAdapter {
  /**
   * Fetches leaderboard data from the /leaderboard/gaming endpoint.
   *
   * @param {PaginationInfo<GamingLeaderboardItem>} args the pagination info
   * @param {number} season the season the leaderboard data is being fetched for
   * @return {Promise<PaginationInfo<GamingLeaderboardItem>>} the leaderboard data
   * @memberof GamingLeaderboardAdapter
   */
  async fetchLeaderboardData(
    args: PaginationInfo<GamingLeaderboardItem>,
    season: number,
  ): Promise<CommonPageApiResponse<GamingLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get<GamingLeaderboardPageApiResponse>(`/v2/leaderboard/gaming`, {
      ...globalAxiosConfig,
      params: args,
    });

    return {
      ...response.data,
      lastUpdated: response.data.lastUpdated * 1000,
    } satisfies CommonPageApiResponse<GamingLeaderboardItem>;
  }
}

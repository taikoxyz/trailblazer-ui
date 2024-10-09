import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardAdapter');

export class DappLeaderboardAdapter {
  /**
   * Fetches leaderboard data from the /leaderboard/dapp endpoint.
   *
   * @param {PaginationInfo<DappLeaderboardItem>} args the pagination info
   * @param {number} season the season the leaderboard data is being fetched for
   * @return {Promise<PaginationInfo<DappLeaderboardItem>>} the leaderboard data
   * @memberof DappLeaderboardAdapter
   */
  async fetchLeaderboardData(
    args: PaginationInfo<DappLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<DappLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get<DappLeaderboardPageApiResponse>(`/v2/leaderboard/dapp`, {
      ...globalAxiosConfig,
      params: args,
    });

    return response.data.data;
  }
}

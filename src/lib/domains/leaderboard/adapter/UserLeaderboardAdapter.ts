import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('UserLeaderboardAdapter');

export class UserLeaderboardAdapter {
  async fetchLeaderboardData(
    args: PaginationInfo<UserLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<UserLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get(`/v2/leaderboard/user`, {
      ...globalAxiosConfig,
      params: args,
    });
    log('leaderboardData', response.data.data);

    return response.data.data;
  }

  /**
   *  Fetches the data for a single user from the /leaderboard/user endpoint
   *
   * @param {number} season
   * @param {string} address
   * @return {*}  {Promise<PaginationInfo<UserLeaderboardItem>>}
   * @memberof UserLeaderboardAdapter
   */
  async fetchLeaderboardPositionForAddress(
    season: number,
    address: string,
  ): Promise<PaginationInfo<UserLeaderboardItem>> {
    log('fetching user leaderboard data', season, address);
    const client = getAxiosInstance(season);
    const response = await client.get('/v2/leaderboard/user', {
      ...globalAxiosConfig,
      params: { address },
    });
    log('userLeaderboardData', response.data.data);

    return response.data.data;
  }
}

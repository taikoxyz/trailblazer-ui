import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import type { PaginationInfo, UserLeaderboardItem, UserLeaderboardPageApiResponse } from '$libs/leaderboard';
import { getLogger } from '$libs/util/logger';

const log = getLogger('UserLeaderboardAdapter');

export class UserLeaderboardAdapter {
  async fetchLeaderboardData(
    args: PaginationInfo<UserLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<UserLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get<UserLeaderboardPageApiResponse>(`/v2/leaderboard/user`, {
      ...globalAxiosConfig,
      params: args,
    });

    return response.data.data;
  }
}

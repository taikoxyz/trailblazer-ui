import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$libs/util/logger';

import type { UserLeaderboardPageApiResponse } from '../dto/user.dto';
import type { UserLeaderboardItem } from '../types/dapps/types';

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

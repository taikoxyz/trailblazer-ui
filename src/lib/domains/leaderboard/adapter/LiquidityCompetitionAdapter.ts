import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('LiquidityCompetitionAdapter');

export class LiquidityCompetitionAdapter {
  async fetchLeaderboardData(
    args: PaginationInfo<UserLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<UserLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get(`/v2/leaderboard/competition/liquidity`, {
      ...globalAxiosConfig,
      params: args,
    });
    log('leaderboardData', response.data.data);

    return response.data.data;
  }
}

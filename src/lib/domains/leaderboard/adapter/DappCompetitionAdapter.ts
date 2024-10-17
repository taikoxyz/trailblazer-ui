import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardAdapter');

export class DappCompetitionAdapter {
  async fetchCompetitionData(
    args: PaginationInfo<DappLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<DappLeaderboardItem>> {
    log('fetching leaderboard data', args, season);

    const client = getAxiosInstance(season);
    const response = await client.get<DappLeaderboardPageApiResponse>(`v2/leaderboard/competition`, {
      ...globalAxiosConfig,
      params: args,
    });

    return response.data.data;
  }
}

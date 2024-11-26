import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$shared/services/api/axiosClient';

import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '../dto/dapps.dto';

export class DappsCompetitionAdapter {
  private competitionUrl: string;

  constructor(competitionUrl: string) {
    this.competitionUrl = competitionUrl;
  }

  /**
   * Fetches competition data from the /leaderboard/competition endpoint.
   *
   * @param {PaginationInfo<DappLeaderboardItem>} args
   * @param {number} season
   * @return {*}  {Promise<PaginationInfo<DappLeaderboardItem>>}
   * @memberof DappsCompetitionAdapter
   */
  async fetchCompetitionData(
    args: PaginationInfo<DappLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<DappLeaderboardItem>> {
    const client = getAxiosInstance(season);
    const response = await client.get<DappLeaderboardPageApiResponse>(
      `/v2/leaderboard/competition/${this.competitionUrl}`,
      {
        ...globalAxiosConfig,
        params: args,
      },
    );

    return response.data.data;
  }
}

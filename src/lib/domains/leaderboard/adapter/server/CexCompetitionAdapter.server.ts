import { API_KEY } from '$env/static/private';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { getLogger } from '$shared/utils/logger';

import type { CexLeaderboardPageApiResponse } from '../../dto/cex.dto';
import type { CexCompetitionItem, CexCompetitionType } from '../../types/cex/types';

const log = getLogger('CexCompetitionAdapter');

export class CexCompetitionAdapter {
  private competitionUrl: string;
  private edition: number;

  constructor(competitionUrl: string, edition: number) {
    this.competitionUrl = competitionUrl;
    this.edition = edition;
  }
  /**
   * Fetches leaderboard data from the /leaderboard/competition/tradingcarnival endpoint.
   *
   * @param {PaginationInfo<CexCompetitionItem>} args
   * @param {CexCompetitionType} type of competition
   * @param {number} season
   * @return {*}  {Promise<PaginationInfo<CexCompetitionItem>>}
   * @memberof CexCompetitionAdapter
   */
  async fetchLeaderboardData(
    args: PaginationInfo<CexCompetitionItem>,
    type: CexCompetitionType,
    season: number,
  ): Promise<PaginationInfo<CexCompetitionItem>> {
    try {
      log('Fetching competition data on server', args, season, this.competitionUrl, this.edition);
      const endpoint = this.buildEndpoint(args, type);
      log('endpoint', endpoint);
      const response = await fetchFromApi<CexLeaderboardPageApiResponse>(endpoint, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      if (!response || !response.data) {
        log('No valid data returned, using default values.');
        return { ...args, items: [], total: 0 };
      }
      const result = response.data;
      return {
        ...result,
        items: result.items || [],
      };
    } catch (error) {
      console.error('Error fetching competition data', error);
      return { ...args, items: [], total: 0 };
    }
  }

  /**
   *  Fetches the data for a single exchange from the /leaderboard/competition/tradingcarnival endpoint
   *
   * @param {PaginationInfo<>} args
   * @param {number} season
   * @param {CexCompetitionType} type of competition
   * @param {string} address
   * @return {*}  {Promise<PaginationInfo<CexCompetitionItem>>}
   * @memberof CexCompetitionAdapter
   */
  async fetchLeaderboardPositionForAddress(
    season: number,
    type: CexCompetitionType,
    exchange: string,
  ): Promise<PaginationInfo<CexCompetitionItem>> {
    log('fetching leaderboard data', season, exchange);
    const client = getAxiosInstance(season);
    const response = await client.get(`/v2/leaderboard/competition/cex/${type}`, {
      ...globalAxiosConfig,
      params: { name: exchange },
    });
    log('cexLeaderboardPosition', response.data.data);

    return response.data.data;
  }

  private buildEndpoint(args: PaginationInfo<CexCompetitionItem>, type: CexCompetitionType): string {
    const params = new URLSearchParams(
      Object.entries(args)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)]),
    );
    const endpoint = `/v2/leaderboard/competition/cex/${type}?${params.toString()}`;
    log('Built endpoint:', endpoint);
    return endpoint;
  }
}

import { API_KEY } from '$env/static/private';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { getLogger } from '$shared/utils/logger';

import type { LiquidityLeaderboardPageApiResponse } from '../../dto/liqudity.dto';
import type { LiquidityCompetitionArgs } from '../../types/competition/types';
import { getSeasonForLiquidityEdition } from '../../utils/mapEditionToSeason';

const log = getLogger('LiquidityCompetitionAdapter');

export class LiquidityCompetitionAdapter {
  private competitionUrl: string;
  private edition: number;

  constructor(competitionUrl: string, edition: number) {
    this.competitionUrl = competitionUrl;
    this.edition = edition;
  }

  /**
   * Fetches leaderboard data from the /leaderboard/competition/liquidity endpoint.
   *
   * @param {LiquidityCompetitionArgs} args
   * @param {number} season
   * @return {*}  {Promise<PaginationInfo<UserLeaderboardItem>>}
   * @memberof LiquidityCompetitionAdapter
   */
  async fetchLeaderboardData(args: LiquidityCompetitionArgs): Promise<PaginationInfo<UserLeaderboardItem>> {
    try {
      const { edition, pagination } = args;
      const season = getSeasonForLiquidityEdition(edition);

      log('fetching leaderboard data', args, season);
      const endpoint = this.buildEndpoint(args);
      const response = await fetchFromApi<LiquidityLeaderboardPageApiResponse>(endpoint, season, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
      if (!response || !response.data) {
        log('No valid data returned, using default values.');
        return { ...pagination, items: [], total: 0 };
      }
      const result = response.data;
      return {
        ...result,
        items: result.items || [],
      };
    } catch (error) {
      console.error('Error fetching competition data', error);
      return { ...args.pagination, items: [], total: 0 };
    }
  }

  /**
   *  Fetches the data for a single user from the /leaderboard/competition/liquidity endpoint
   *
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
    const endpoint = this.buildPositionEndpoint(address);
    const response = await fetchFromApi<LiquidityLeaderboardPageApiResponse>(endpoint, season, {
      method: 'GET',
      headers: { 'x-api-key': `${API_KEY}` },
    });
    log('userLeaderboardData', response.data);
    return response.data;
  }

  private buildEndpoint(args: LiquidityCompetitionArgs): string {
    const queryParams = new URLSearchParams();
    const pagination = args.pagination || {};
    Object.entries(pagination).forEach(([key, value]) => {
      queryParams.set(key, String(value));
    });
    if (args.address) {
      queryParams.set('address', String(args.address));
    }
    queryParams.set('edition', String(args.edition));
    queryParams.set('competitionType', String(args.competitionType));
    const endpoint = `/v2/leaderboard/competition/${this.competitionUrl}?${queryParams.toString()}`;
    return endpoint;
  }

  private buildPositionEndpoint(address: string): string {
    const params = new URLSearchParams({ address: address });
    const endpoint = `/v2/leaderboard/competition/${this.competitionUrl}?${params.toString()}`;
    log('built position endpoint', endpoint);
    return endpoint;
  }
}

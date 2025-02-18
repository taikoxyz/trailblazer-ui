import { API_KEY } from '$env/static/private';
import type { DappLeaderboardItem, DappLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/dapps.dto';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardAdapter');

export class DappCompetitionAdapter {
  private competitionUrl: string;
  private edition: number;

  constructor(competitionUrl: string, edition: number) {
    this.competitionUrl = competitionUrl;
    this.edition = edition;
  }

  /**
   * Fetches competition data from the /leaderboard/competition endpoint.
   *
   * @param {PaginationInfo<DappLeaderboardItem>} args the pagination info
   * @param {number} season the season the competition data is being fetched for
   * @return {Promise<PaginationInfo<DappLeaderboardItem>>} the competition data
   * @memberof DappCompetitionAdapter
   */
  async fetchCompetitionData(
    args: PaginationInfo<DappLeaderboardItem>,
    season: number,
  ): Promise<PaginationInfo<DappLeaderboardItem>> {
    try {
      log('Fetching competition data on server', args, season, this.competitionUrl, this.edition);
      const endpoint = this.buildEndpoint(args);
      log('endpoint', endpoint);
      const response = await fetchFromApi<DappLeaderboardPageApiResponse>(endpoint, season, {
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
   * Build the endpoint based on the edition.
   * - For edition 1 and 2, the slug remains unchanged.
   * - For edition 3 and up, the slug is appended with a dash and the edition.
   * The final endpoint will look like:
   *   s<season>/v2/leaderboard/competition/thrillblazer (edition 1 or 2)
   *   s<season>/v2/leaderboard/competition/thrillblazer-3 (edition 3+)
   */
  private buildEndpoint(args: PaginationInfo<DappLeaderboardItem>): string {
    const params = new URLSearchParams(
      Object.entries(args)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)]),
    );
    // For editions 1 and 2, leave the slug unchanged; for edition 3+, append the dash and edition.
    const endpointSlug = this.edition < 3 ? this.competitionUrl : `${this.competitionUrl}/${this.edition}`;
    const endpoint = `/v2/leaderboard/competition/${endpointSlug}?${params.toString()}`;
    log('Built endpoint:', endpoint);
    return endpoint;
  }
}

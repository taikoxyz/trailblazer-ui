import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

import { CexCompetitionAdapter } from '../adapter/CexCompetitionAdapter';
import { mapCexLeaderboardRow } from '../mapper/mapper';
import { CexCompetitionRepository } from '../repository/CexCompetitionRepository';
import type { CexCompetitionPage, CexCompetitionRow, CexCompetitionType } from '../types/cex/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';

const log = getLogger('CexCompetitionService');

export class CexCompetitionService {
  // Adapters
  private leaderboardAdapter: CexCompetitionAdapter;

  // Repositories
  private readonly cexCompetitionRepository: CexCompetitionRepository;

  constructor(leaderboardAdapter?: CexCompetitionAdapter, cexCompetitionRepository?: CexCompetitionRepository) {
    this.leaderboardAdapter = leaderboardAdapter || new CexCompetitionAdapter();
    this.cexCompetitionRepository = cexCompetitionRepository || new CexCompetitionRepository();
  }

  /**
   * Fetches cex competition leaderboard data for a given season with pagination.
   *
   * @param args - Pagination and filtering parameters.
   * @param {CexCompetitionType} type of competition
   * @param season - The current season number.
   * @returns A promise that resolves to a CexCompetitionPage.
   */
  async getCexCompetitionLeaderboard(
    args: PaginationInfo<CexCompetitionRow>,
    type: CexCompetitionType,
    season: number,
  ): Promise<CexCompetitionPage> {
    log('Fetching leaderboard data', { args, season });

    try {
      const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardData(args, type, season);
      log('Fetched leaderboard data', leaderboardData);

      if (!leaderboardData.data.items?.length) {
        log('No leaderboard items found', { args, season });
        return {
          items: [],
          lastUpdated: Date.now(),
          pagination: { ...args, total: leaderboardData.data.total, total_pages: leaderboardData.data.total_pages },
        };
      }

      const itemsWithDetails: UnifiedLeaderboardRow[] = [];
      for (let index = 0; index < leaderboardData.data.items.length; index++) {
        const item = leaderboardData.data.items[index];
        const entry: CexCompetitionRow = {
          name: item.name,
          score: item.score,
          icon: '',
          rank: item.rank,
        };
        const mapped = mapCexLeaderboardRow(entry);
        itemsWithDetails.push(mapped);
      }

      const cexCompetionPage: CexCompetitionPage = {
        items: itemsWithDetails,
        lastUpdated: leaderboardData.lastUpdated,
        pagination: {
          ...args,
          total: leaderboardData.data.total,
        },
      };
      log('Liquidity competition leaderboard page', cexCompetionPage, cexCompetionPage.lastUpdated);

      if (itemsWithDetails.length > 0) {
        await this.cexCompetitionRepository.update(cexCompetionPage);
        log('Updated leaderboard repository', cexCompetionPage);
      }

      return cexCompetionPage;
    } catch (error) {
      log('Error fetching leaderboard data', error);
      return {
        items: [],
        lastUpdated: Date.now(),
        pagination: { ...args, total: 0 },
      };
    }
  }
}

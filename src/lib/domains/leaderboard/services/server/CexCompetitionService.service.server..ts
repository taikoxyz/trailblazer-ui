import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

import { CexCompetitionAdapter } from '../../adapter/server/CexCompetitionAdapter.server';
import { mapCexLeaderboardRow } from '../../mapper/mapper';
import { CexCompetitionRepository } from '../../repository/CexCompetitionRepository';
import type { CexCompetitionItem, CexCompetitionPage } from '../../types/cex/types';
import type { CexCompetitionArgs } from '../../types/competition/types';
import type { UnifiedLeaderboardRow } from '../../types/shared/types';
import { getSeasonForCexEdition } from '../../utils/mapEditionToSeason';

const log = getLogger('CexCompetitionService');

export class CexCompetitionService {
  // Adapters
  private leaderboardAdapter: CexCompetitionAdapter;

  // Repositories
  private readonly cexCompetitionRepository: CexCompetitionRepository;

  constructor(leaderboardAdapter: CexCompetitionAdapter, cexCompetitionRepository: CexCompetitionRepository) {
    this.leaderboardAdapter = leaderboardAdapter;
    this.cexCompetitionRepository = cexCompetitionRepository;
  }

  /**
   * Fetches cex competition leaderboard data for a given season with pagination.
   *
   * @param {CexCompetitionArgs} - Pagination and filtering parameters.
   * @returns A promise that resolves to a CexCompetitionPage.
   */
  async getCompetitionData(args: CexCompetitionArgs): Promise<CexCompetitionPage> {
    log('Fetching leaderboard data', args, this.leaderboardAdapter);

    try {
      const { competitionType, edition, pagination } = args;

      const season = getSeasonForCexEdition(edition);

      const leaderboardPage: CexCompetitionPage = {
        items: [],
        lastUpdated: Date.now(),
        pagination: { ...pagination },
      };

      const leaderboardData: PaginationInfo<CexCompetitionItem> = await this.leaderboardAdapter.fetchLeaderboardData(
        pagination,
        competitionType,
        season,
      );

      log('fetched leaderboardData', args, leaderboardData.items?.length);

      if (leaderboardData.items && leaderboardData.items.length > 0) {
        const itemsWithDetails: UnifiedLeaderboardRow[] = [];
        for (let index = 0; index < leaderboardData.items.length; index++) {
          const item = leaderboardData.items[index];
          const entry: CexCompetitionItem = {
            name: item.name,
            score: item.score,
            icon: item.icon,
            rank: item.rank,
          };
          const mapped = mapCexLeaderboardRow(entry);
          itemsWithDetails.push(mapped);
        }

        leaderboardPage.items.push(...itemsWithDetails);
        log('Cex competition leaderboard page', leaderboardPage, leaderboardPage.lastUpdated);
        leaderboardPage.pagination = { ...leaderboardData };
        if (itemsWithDetails.length > 0) {
          await this.cexCompetitionRepository.update(leaderboardPage);
          log('Updated leaderboard repository', leaderboardPage);
        }
      }
      return leaderboardPage;
    } catch (error) {
      console.error('Error in getCompetitionData', error);
      throw new Error('Failed to fetch competition data');
    }

    //   const leaderboardData: PaginationInfo<CexCompetitionItem> = await this.leaderboardAdapter.fetchLeaderboardData(pagination, competitionType, season);
    //   log('Fetched leaderboard data', leaderboardData);

    //   if (!leaderboardData.data.items?.length) {
    //     log('No leaderboard items found', { args, season });
    //     return {
    //       items: [],
    //       lastUpdated: Date.now(),
    //       pagination: { ...args, total: leaderboardData.data.total, total_pages: leaderboardData.data.total_pages },
    //     };
    //   }

    //   const itemsWithDetails: UnifiedLeaderboardRow[] = [];
    //   for (let index = 0; index < leaderboardData.data.items.length; index++) {
    //     const item = leaderboardData.data.items[index];
    //     const entry: CexCompetitionItem = {
    //       name: item.name,
    //       score: item.score,
    //       icon: '',
    //       rank: item.rank,
    //     };
    //     const mapped = mapCexLeaderboardRow(entry);
    //     itemsWithDetails.push(mapped);
    //   }

    //   const cexCompetionPage: CexCompetitionPage = {
    //     items: itemsWithDetails,
    //     lastUpdated: leaderboardData.lastUpdated,
    //     pagination: {
    //       ...args,
    //       total: leaderboardData.data.total,
    //     },
    //   };
    //   log('Liquidity competition leaderboard page', cexCompetionPage, cexCompetionPage.lastUpdated);

    //   if (itemsWithDetails.length > 0) {
    //     await this.cexCompetitionRepository.update(cexCompetionPage);
    //     log('Updated leaderboard repository', cexCompetionPage);
    //   }

    //   return cexCompetionPage;
    // } catch (error) {
    //   log('Error fetching leaderboard data', error);
    //   return {
    //     items: [],
    //     lastUpdated: Date.now(),
    //     pagination: { ...args, total: 0 },
    //   };
  }
}

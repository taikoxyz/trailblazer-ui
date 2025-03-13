import { log } from 'debug';

import { DappsCompetitionRepository } from '$lib/domains/leaderboard/repository/DappsCompetitionRepository';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { DappCompetitionAdapter } from '../../adapter/server/DappCompetitionAdapter.server';
import type { ProtocolDetailsAdapter } from '../../adapter/server/ProtocolDetailsAdapter.server';
// import { DappCompetitionAdapter } from '../adapter/DappCompetitionAdapter';
import type { DappLeaderboardItem } from '../../dto/dapps.dto';
import { mapDappLeaderboardRow } from '../../mapper/mapper';
import { CompetitionType, type DappCompetitionArgs } from '../../types/competition/types';
import type { DappLeaderboardPage, DappLeaderboardRow } from '../../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../../types/shared/types';
import { getSeasonForChillblazerEdition, getSeasonForThrillblazerEdition } from '../../utils/mapEditionToSeason';

export class DappCompetitionService {
  // adapters
  private competitionAdapter: DappCompetitionAdapter;
  private protocolAdapter: ProtocolDetailsAdapter;

  // repositories
  private competitionRepository: DappsCompetitionRepository;

  constructor(
    competitionAdapter: DappCompetitionAdapter,
    protocolAdapter: ProtocolDetailsAdapter,
    competitionRepository: DappsCompetitionRepository,
  ) {
    this.competitionRepository = competitionRepository;
    this.protocolAdapter = protocolAdapter;
    this.competitionAdapter = competitionAdapter;
  }

  async getCompetitionData(args: DappCompetitionArgs): Promise<DappLeaderboardPage> {
    log('fetching competition data', args, this.competitionAdapter);
    try {
      const { competitionType, edition, pagination } = args;

      let season = 0;
      if (competitionType === CompetitionType.CHILLBLAZER) {
        season = getSeasonForChillblazerEdition(edition);
      } else if (competitionType === CompetitionType.THRILLBLAZER) {
        season = getSeasonForThrillblazerEdition(edition);
      } else {
        throw new Error('Invalid competition type', competitionType);
      }

      const leaderboardPage: DappLeaderboardPage = {
        items: [],
        lastUpdated: Date.now(),
        pagination: { ...pagination },
      };

      log('competitionAdapter', this.competitionAdapter);

      const leaderboardData: PaginationInfo<DappLeaderboardItem> = await this.competitionAdapter.fetchCompetitionData(
        pagination,
        season,
      );

      log('fetched leaderboardData', args, leaderboardData.items?.length);

      if (leaderboardData.items && leaderboardData.items.length > 0) {
        log('fetching protocol details for leaderboard items', leaderboardData.items.length, edition);
        const protocolDetailsPromises = leaderboardData.items.map(async (item) => {
          try {
            const protocolDetails = await this.protocolAdapter.fetchProtocolDetails(item.slug, season, edition);
            const entry: DappLeaderboardRow = {
              name: item.name,
              data: protocolDetails.protocols,
              metadata: {
                slug: item.slug,
                logo: protocolDetails.metadata?.logo || '',
                name: item.name,
                twitter: protocolDetails.metadata?.twitter || '',
              },
              totalScore: item.score,
              rank: item.rank,
            };
            const unifiedRow: UnifiedLeaderboardRow = mapDappLeaderboardRow(entry);

            return unifiedRow;
          } catch (error) {
            log(`Error fetching protocol details for ${item.slug}:`, error);
            return null;
          }
        });

        const settledRows = await Promise.all(protocolDetailsPromises);
        const unifiedRows = settledRows.filter((row): row is UnifiedLeaderboardRow => row !== null);

        leaderboardPage.items.push(...unifiedRows);
        leaderboardPage.pagination = { ...leaderboardData };
        this.competitionRepository.update(leaderboardPage);
      }
      return leaderboardPage;
    } catch (error) {
      console.error('Error in getCompetitionData', error);
      throw new Error('Failed to fetch competition data');
    }
  }
}

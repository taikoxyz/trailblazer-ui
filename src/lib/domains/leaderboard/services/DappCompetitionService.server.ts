import { log } from 'debug';

import { DappsCompetitionRepository } from '$lib/domains/leaderboard/repository/DappsCompetitionRepository';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { DappCompetitionAdapter } from '../adapter/server/DappCompetitionAdapter.server';
import type { ProtocolDetailsAdapter } from '../adapter/server/ProtocolDetailsAdapter.server';
// import { DappCompetitionAdapter } from '../adapter/DappCompetitionAdapter';
import type { DappLeaderboardItem } from '../dto/dapps.dto';
import { mapDappLeaderboardRow } from '../mapper/mapper';
import type { DappLeaderboardPage, DappLeaderboardRow } from '../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';

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

  async getCompetitionData(args: PaginationInfo<DappLeaderboardItem>, season: number): Promise<DappLeaderboardPage> {
    log('fetching competition data', args, season, this.competitionAdapter);

    try {
      const leaderboardPage: DappLeaderboardPage = {
        items: [],
        lastUpdated: Date.now(),
        pagination: { ...args },
      };

      log('competitionAdapter', this.competitionAdapter);

      const leaderboardData: PaginationInfo<DappLeaderboardItem> = await this.competitionAdapter.fetchCompetitionData(
        args,
        season,
      );

      log('fetched leaderboardData', args, leaderboardData.items?.length);

      if (leaderboardData.items && leaderboardData.items.length > 0) {
        log('fetching protocol details for leaderboard items', leaderboardData.items.length);
        const protocolDetailsPromises = leaderboardData.items.map(async (item) => {
          try {
            const protocolDetails = await this.protocolAdapter.fetchProtocolDetails(item.slug, season);
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

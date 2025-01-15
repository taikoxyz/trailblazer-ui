import { log } from 'debug';

import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import { DappsCompetitionRepository } from '$lib/domains/leaderboard/repository/DappsCompetitionRepository';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

import type { DappsCompetitionAdapter } from '../adapter/DappsCompetitionAdapter';
// import { DappCompetitionAdapter } from '../adapter/DappCompetitionAdapter';
import type { DappLeaderboardItem } from '../dto/dapps.dto';
import { mapDappLeaderboardRow } from '../mapper/mapper';
import type { DappLeaderboardPage, DappLeaderboardRow } from '../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';

export class DappCompetitionService {
  // adapters
  private competitionAdapter: DappsCompetitionAdapter;
  private protocolAdapter: ProtocolAdapter;

  // repositories
  private competitionRepository: DappsCompetitionRepository;

  constructor(
    competitionAdapter: DappsCompetitionAdapter,
    protocolAdapter: ProtocolAdapter,
    competitionRepository: DappsCompetitionRepository,
  ) {
    this.competitionRepository = competitionRepository;
    this.protocolAdapter = protocolAdapter;
    this.competitionAdapter = competitionAdapter;
  }

  async getCompetitionData(args: PaginationInfo<DappLeaderboardItem>, season: number): Promise<DappLeaderboardPage> {
    log('fetching competition data', args, season);

    const leaderboardPage: DappLeaderboardPage = {
      items: [],
      lastUpdated: Date.now(),
      pagination: { ...args },
    };

    const leaderboardData: PaginationInfo<DappLeaderboardItem> = await this.competitionAdapter.fetchCompetitionData(
      args,
      season,
    );

    log('fetched leaderboardData', leaderboardData);

    if (leaderboardData.items && leaderboardData.items.length > 0) {
      const protocolDetailsPromises = leaderboardData.items.map(async (item) => {
        try {
          const protocolDetails = await this.protocolAdapter.fetchProtocolDetails(item.slug, season);
          log(`details for ${item.slug}`, protocolDetails);

          const entry: DappLeaderboardRow = {
            name: item.name,
            data: protocolDetails.protocols,
            metadata: protocolDetails.metadata,
            totalScore: item.score,
            rank: item.rank,
          };

          const unifiedRow: UnifiedLeaderboardRow = mapDappLeaderboardRow(entry);
          log(`unifiedRow`, unifiedRow);

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
  }
}

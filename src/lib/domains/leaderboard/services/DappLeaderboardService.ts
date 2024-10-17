import { DappLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/DappLeaderboardAdapter';
import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { mapDappLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { DappLeaderboardRepository } from '$lib/domains/leaderboard/repository/DappLeaderboardRepository';
import type { DappLeaderboardPage, DappLeaderboardRow } from '$lib/domains/leaderboard/types/dapps/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardService');

export class DappLeaderboardService {
  // adapters
  private leaderboardAdapter: DappLeaderboardAdapter;
  private protocolAdapter: ProtocolAdapter;

  // repositories
  private leaderboardRepository: DappLeaderboardRepository;

  constructor(
    leaderboardAdapter?: DappLeaderboardAdapter,
    protocolAdapter?: ProtocolAdapter,
    leaderboardRepository?: DappLeaderboardRepository,
  ) {
    this.leaderboardRepository = leaderboardRepository ? leaderboardRepository : new DappLeaderboardRepository();
    this.protocolAdapter = protocolAdapter ? protocolAdapter : new ProtocolAdapter();
    this.leaderboardAdapter = leaderboardAdapter ? leaderboardAdapter : new DappLeaderboardAdapter();
  }

  /**
   * Fetches dapp leaderboard data.
   *
   * @param {PaginationInfo<DappLeaderboardItem>} args
   * @param {number} season
   * @return {*}
   * @memberof DappLeaderboardService
   */
  async getDappLeaderboardData(
    args: PaginationInfo<DappLeaderboardItem>,
    season: number,
  ): Promise<DappLeaderboardPage> {
    const leaderboardPage: DappLeaderboardPage = {
      items: [],
      lastUpdated: Date.now(),
      pagination: { ...args },
    };
    log('fetching leaderboard data', args, season);
    const leaderboardData: PaginationInfo<DappLeaderboardItem> = await this.leaderboardAdapter.fetchLeaderboardData(
      args,
      season,
    );

    log('leaderboardData', leaderboardData);

    if (leaderboardData.items && leaderboardData.items.length > 0) {
      const protocolDetailsPromises = leaderboardData.items.map(async (item) => {
        try {
          const protocolDetails = await this.protocolAdapter.fetchProtocolDetails(item.slug, season);
          log(`details for ${item.slug}`, protocolDetails);

          const entry: DappLeaderboardRow = {
            address: item.address,
            data: protocolDetails.protocols,
            metadata: protocolDetails.metadata,
            totalScore: item.score,
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
      this.leaderboardRepository.update(leaderboardPage);
      return leaderboardPage;
    }
    return leaderboardPage;
  }
}

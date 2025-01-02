import { DappLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/DappLeaderboardAdapter';
import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { mapDappLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { DappLeaderboardRepository } from '$lib/domains/leaderboard/repository/DappLeaderboardRepository';
import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
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
    this.protocolAdapter = protocolAdapter ? protocolAdapter : new ProtocolAdapter('details');
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
    const leaderboardPage: DappLeaderboardPage = { items: [], lastUpdated: 0, pagination: { ...args } };
    log('fetching leaderboard data', args, season);

    const leaderboardData = await this.leaderboardAdapter.fetchLeaderboardData(args, season);
    const items = leaderboardData.data.items ?? [];

    if (items.length === 0) return leaderboardPage;

    const rows = await Promise.all(
      items.map(async (item) => {
        try {
          const { protocols, metadata } = await this.protocolAdapter.fetchProtocolDetails(item.slug, season);
          return mapDappLeaderboardRow({
            name: item.name,
            rank: item.rank,
            data: protocols,
            metadata,
            totalScore: item.score,
          });
        } catch (error) {
          log(`Error fetching protocol details for ${item.slug}:`, error);
          return null;
        }
      }),
    );

    leaderboardPage.items = rows.filter((row): row is UnifiedLeaderboardRow => row !== null);
    leaderboardPage.lastUpdated = leaderboardData.lastUpdated;
    leaderboardPage.pagination = { page: args.page, size: args.size, total: leaderboardData.data.total };

    this.leaderboardRepository.update(leaderboardPage);
    return leaderboardPage;
  }
}

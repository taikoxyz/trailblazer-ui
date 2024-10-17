import { GamingLeaderboardAdapter } from '$lib/domains/leaderboard/adapter/GamingLeaderboardAdapter';
import { ProtocolAdapter } from '$lib/domains/leaderboard/adapter/ProtocolAdapter';
import type { GamingLeaderboardItem } from '$lib/domains/leaderboard/dto/gaming.dto';
import { mapGamingDetails } from '$lib/domains/leaderboard/mapper/gamingDetailsMapper';
import { mapGamingLeaderboardRow } from '$lib/domains/leaderboard/mapper/mapper';
import { GamingLeaderboardRepository } from '$lib/domains/leaderboard/repository/GamingLeaderboardRepository';
import type { GamingLeaderboardPage, GamingLeaderboardRow } from '$lib/domains/leaderboard/types/dapps/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('GamingLeaderboardService');

export class GamingLeaderboardService {
  // adapters
  private leaderboardAdapter: GamingLeaderboardAdapter;
  private protocolAdapter: ProtocolAdapter;

  // repositories
  private leaderboardRepository: GamingLeaderboardRepository;

  constructor(
    leaderboardAdapter?: GamingLeaderboardAdapter,
    protocolAdapter?: ProtocolAdapter,
    leaderboardRepository?: GamingLeaderboardRepository,
  ) {
    this.leaderboardRepository = leaderboardRepository ? leaderboardRepository : new GamingLeaderboardRepository();
    this.protocolAdapter = protocolAdapter ? protocolAdapter : new ProtocolAdapter();
    this.leaderboardAdapter = leaderboardAdapter ? leaderboardAdapter : new GamingLeaderboardAdapter();
  }

  /**
   * Fetches gaming leaderboard data.
   *
   * @param {PaginationInfo<GamingLeaderboardItem>} args
   * @param {number} season
   * @return {*}
   * @memberof GamingLeaderboardService
   */
  async getGamingLeaderboardData(args: PaginationInfo<GamingLeaderboardItem>, season: number) {
    const leaderboardPage: GamingLeaderboardPage = {
      items: [],
      lastUpdated: Date.now(),
      pagination: { ...args },
    };
    log('fetching leaderboard data', args, season);
    const leaderboardData: PaginationInfo<GamingLeaderboardItem> = await this.leaderboardAdapter.fetchLeaderboardData(
      args,
      season,
    );

    log('leaderboardData', leaderboardData);

    if (leaderboardData.items && leaderboardData.items.length > 0) {
      const protocolDetailsPromises = leaderboardData.items.map(async (item) => {
        const protocolDetails = await this.protocolAdapter.fetchGamingProtocolDetails(item.slug, season);

        log(`details for ${item.slug}`, protocolDetails);

        const entry: GamingLeaderboardRow = {
          address: item.address,
          rank: item.rank,
          data: protocolDetails.protocols,
          metadata: protocolDetails.metadata,
          totalScore: item.score,
        };

        const unifiedRow: UnifiedLeaderboardRow = mapGamingLeaderboardRow(entry);

        const protocolName = protocolDetails.metadata?.name || entry.address;
        const additionalDetails = mapGamingDetails(protocolName);

        if (additionalDetails) {
          unifiedRow.handle = additionalDetails.handle;
          unifiedRow.icon = additionalDetails.icon;
        } else {
          log(`No mapping found for protocol: ${protocolName}`);
        }

        log(`unifiedRow`, unifiedRow);
        return unifiedRow;
      });

      const unifiedRows = await Promise.all(protocolDetailsPromises);
      leaderboardPage.items.push(...unifiedRows);
      leaderboardPage.pagination = { ...leaderboardData };
      await this.leaderboardRepository.update(leaderboardPage);

      return leaderboardPage;
    }
  }
}

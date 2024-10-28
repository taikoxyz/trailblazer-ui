import { currentLiquidityCompetitionLeaderboard } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
import type { LiquidityCompetitionPage } from '$lib/domains/leaderboard/types/liquidity/types';
import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('LiquidityCompetitionRepository');

export class LiquidityCompetitionRepository extends IRepository<LiquidityCompetitionPage> {
  async save(leaderboardPage: LiquidityCompetitionPage) {
    log('saving leaderboard data', leaderboardPage);
    currentLiquidityCompetitionLeaderboard.set(leaderboardPage);
  }

  async update(leaderboardPage: LiquidityCompetitionPage) {
    log('updating leaderboard data', leaderboardPage);
    currentLiquidityCompetitionLeaderboard.update((store) => {
      store.items = leaderboardPage.items.filter((item) => !!item.address);
      return store;
    });
  }
}

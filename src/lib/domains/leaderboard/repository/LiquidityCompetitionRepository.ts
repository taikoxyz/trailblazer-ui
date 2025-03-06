import type { Writable } from 'svelte/store';

import { currentLiquidityCompetitionLeaderboard } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
import type { LiquidityCompetitionPage } from '$lib/domains/leaderboard/types/liquidity/types';
import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('LiquidityCompetitionRepository');

export class LiquidityCompetitionRepository extends IRepository<LiquidityCompetitionPage> {
  private store: Writable<LiquidityCompetitionPage>;

  constructor(store: Writable<LiquidityCompetitionPage>) {
    super();
    this.store = store;
  }

  async save(leaderboardPage: LiquidityCompetitionPage) {
    log('saving leaderboard data', leaderboardPage);
    this.store.set(leaderboardPage);
  }

  async update(leaderboardPage: LiquidityCompetitionPage) {
    log('updating leaderboard data', leaderboardPage);
    currentLiquidityCompetitionLeaderboard.update((store) => {
      return {
        ...store,
        items: leaderboardPage.items.filter((item) => !!item.address),
        lastUpdated: leaderboardPage.lastUpdated,
        pagination: leaderboardPage.pagination,
      };
    });
  }
}

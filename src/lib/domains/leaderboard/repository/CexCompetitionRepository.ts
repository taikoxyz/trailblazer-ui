import type { Writable } from 'svelte/store';

import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

import { cexLeaderboardStore } from '../stores/cexCompetitionStore';
import type { CexCompetitionPage } from '../types/cex/types';

const log = getLogger('CexCompetitionRepository');

export class CexCompetitionRepository extends IRepository<CexCompetitionPage> {
  private store: Writable<CexCompetitionPage>;

  constructor(store: Writable<CexCompetitionPage>) {
    super();
    this.store = store;
  }
  async save(leaderboardPage: CexCompetitionPage) {
    log('saving leaderboard data', leaderboardPage);
    cexLeaderboardStore.set(leaderboardPage);
  }

  async update(leaderboardPage: CexCompetitionPage) {
    log('updating leaderboard data', leaderboardPage);
    cexLeaderboardStore.update((store) => {
      return {
        ...store,
        items: leaderboardPage.items.filter((item) => !!item.address),
        lastUpdated: leaderboardPage.lastUpdated,
        pagination: leaderboardPage.pagination,
      };
    });
  }
}

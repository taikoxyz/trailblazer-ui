import type { Writable } from 'svelte/store';

import { IRepository } from '$shared/repository/IRepository';

import type { DappLeaderboardPage } from '../types/dapps/types';

export class DappsCompetitionRepository extends IRepository<DappLeaderboardPage> {
  private store: Writable<DappLeaderboardPage>;

  constructor(store: Writable<DappLeaderboardPage>) {
    super();
    this.store = store;
  }

  async save(leaderboardPage: DappLeaderboardPage) {
    this.store.set(leaderboardPage);
  }

  async update(leaderboardPage: DappLeaderboardPage) {
    this.store.update((store) => ({
      ...store,
      items: leaderboardPage.items.filter((item) => !!item.name),
      lastUpdated: leaderboardPage.lastUpdated,
      pagination: leaderboardPage.pagination,
    }));
  }
}

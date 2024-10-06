import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$libs/util/logger';

import { currentGamingLeaderboard } from '../stores/gamingLeaderboard';
import type { GamingLeaderboardPage } from '../types/dapps/types';

const log = getLogger('GamingLeaderboardRepository');

export class GamingLeaderboardRepository extends IRepository<GamingLeaderboardPage> {
  async save(leaderboardPage: GamingLeaderboardPage) {
    log('saving leaderboard data', leaderboardPage);
    currentGamingLeaderboard.set(leaderboardPage);
  }

  async update(leaderboardPage: GamingLeaderboardPage) {
    log('updating leaderboard data', leaderboardPage);
    currentGamingLeaderboard.update((store) => {
      store.items = leaderboardPage.items.filter((item) => !!item.address);
      return store;
    });
  }
}

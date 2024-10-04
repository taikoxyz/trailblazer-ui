import { getLogger } from '$libs/util/logger';

import { currentDappLeaderboard } from '../stores/dappleaderboard';
import type { DappLeaderboardPage } from '../types/dapps/types';

const log = getLogger('DappLeaderboardRepository');

export class DappLeaderboardRepository {
  async save(leaderboardPage: DappLeaderboardPage) {
    log('saving leaderboard data', leaderboardPage);
  }

  async update(leaderboardPage: DappLeaderboardPage) {
    log('updating leaderboard data', leaderboardPage);
    currentDappLeaderboard.update((store) => {
      store.items = leaderboardPage.items.filter((item) => !!item.address);
      return store;
    });
  }
}

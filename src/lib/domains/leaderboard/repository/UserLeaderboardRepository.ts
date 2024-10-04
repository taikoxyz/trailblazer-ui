import { getLogger } from '$libs/util/logger';

import { currentUserLeaderboard } from '../stores/userLeaderboard';
import type { UserLeaderboardPage } from '../types/dapps/types';

const log = getLogger('UserLeaderboardRepository');

export class UserLeaderboardRepository {
  async save(leaderboardPage: UserLeaderboardPage) {
    log('saving leaderboard data', leaderboardPage);
  }

  async update(leaderboardPage: UserLeaderboardPage) {
    log('updating leaderboard data', leaderboardPage);
    currentUserLeaderboard.update((store) => {
      store.items = leaderboardPage.items.filter((item) => !!item.address);
      return store;
    });
  }
}

import { currentUserLeaderboard } from '$lib/domains/leaderboard/stores/userLeaderboard';
import type { UserLeaderboardPage } from '$lib/domains/leaderboard/types/user/types';
import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('UserLeaderboardRepository');

export class UserLeaderboardRepository extends IRepository<UserLeaderboardPage> {
  async save(leaderboardPage: UserLeaderboardPage) {
    log('saving leaderboard data', leaderboardPage);
    currentUserLeaderboard.set(leaderboardPage);
  }

  async update(leaderboardPage: UserLeaderboardPage) {
    log('updating leaderboard data', leaderboardPage);
    currentUserLeaderboard.update((store) => {
      return {
        ...store,
        items: leaderboardPage.items.filter((item) => !!item.address),
        lastUpdated: leaderboardPage.lastUpdated,
        pagination: leaderboardPage.pagination,
      };
    });
  }
}

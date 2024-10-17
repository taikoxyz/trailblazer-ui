import { currentGamingLeaderboard } from '$lib/domains/leaderboard/stores/gamingLeaderboard';
import type { GamingLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

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

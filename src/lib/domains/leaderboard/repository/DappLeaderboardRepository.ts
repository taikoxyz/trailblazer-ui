import { currentDappLeaderboard } from '$lib/domains/leaderboard/stores';
import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardRepository');

export class DappLeaderboardRepository extends IRepository<DappLeaderboardPage> {
  async save(leaderboardPage: DappLeaderboardPage) {
    log('saving leaderboard data', leaderboardPage);
    currentDappLeaderboard.set(leaderboardPage);
  }

  async update(leaderboardPage: DappLeaderboardPage) {
    log('updating leaderboard data', leaderboardPage);
    currentDappLeaderboard.update((store: DappLeaderboardPage) => {
      store.items = leaderboardPage.items.filter((item) => !!item.address);
      return store;
    });
  }
}

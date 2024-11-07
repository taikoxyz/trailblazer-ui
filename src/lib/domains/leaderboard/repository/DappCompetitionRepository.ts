import currentDappCompetitionLeaderboard from '$lib/domains/leaderboard/stores/dappCompetitionLeaderboard';
import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
import { IRepository } from '$shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardRepository');

export class DappCompetitionRepository extends IRepository<DappLeaderboardPage> {
  async save(leaderboardPage: DappLeaderboardPage) {
    log('saving leaderboard data', leaderboardPage);
    currentDappCompetitionLeaderboard.set(leaderboardPage);
  }
  async update(leaderboardPage: DappLeaderboardPage) {
    log('updating leaderboard data', leaderboardPage);
    currentDappCompetitionLeaderboard.update((store: DappLeaderboardPage) => {
      return {
        ...store,
        items: leaderboardPage.items.filter((item) => !!item.name),
        lastUpdated: leaderboardPage.lastUpdated,
        pagination: leaderboardPage.pagination,
      };
    });
  }
}

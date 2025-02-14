import { IRepository } from '$lib/shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

import { currentCexCompetitionLeaderboard } from '../stores/cexLeaderboard';
import type { CexCompetitionPage } from '../types/cex/types';

const log = getLogger('CexCompetitionRepository');

export class CexCompetitionRepository extends IRepository<CexCompetitionPage> {
  async save(leaderboardPage: CexCompetitionPage) {
    log('saving leaderboard data', leaderboardPage);
    currentCexCompetitionLeaderboard.set(leaderboardPage);
  }

  async update(leaderboardPage: CexCompetitionPage) {
    log('updating leaderboard data', leaderboardPage);
    currentCexCompetitionLeaderboard.update((store) => {
      return {
        ...store,
        items: leaderboardPage.items.filter((item) => !!item.address),
        lastUpdated: leaderboardPage.lastUpdated,
        pagination: leaderboardPage.pagination,
      };
    });
  }
}

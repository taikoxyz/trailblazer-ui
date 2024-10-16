import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
import { IRepository } from '$shared/repository/IRepository';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('DappLeaderboardRepository');

export class DappCompetitionRepository extends IRepository<DappLeaderboardPage> {
  save(leaderboardPage: DappLeaderboardPage): Promise<void> {
    log('saving leaderboard data', leaderboardPage);
    throw new Error('Method not implemented.');
  }
  update(leaderboardPage: DappLeaderboardPage): Promise<void> {
    log('updating leaderboard data', leaderboardPage);
    throw new Error('Method not implemented.');
  }
}

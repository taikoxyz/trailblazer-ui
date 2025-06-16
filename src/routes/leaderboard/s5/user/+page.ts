import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
// import { userLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import { clearUserLeaderboardStore } from '$lib/domains/leaderboard/stores/userLeaderboard';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async () => {
  const season = 5;
  let loading = true;
  const pageInfo: PaginationInfo<UserLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
    total: 0,
  };

  if (browser) {
    // Clear the store first to ensure clean state
    clearUserLeaderboardStore(season);

    loading = false;
  }
  return {
    pageInfo,
    loading,
    season,
  };
};

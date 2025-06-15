import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { userLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import { clearUserLeaderboardStore } from '$lib/domains/leaderboard/stores/userLeaderboard';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async () => {
  const season = 1;
  let loading = true;
  let pageInfo: PaginationInfo<UserLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
    total: 0,
  };

  if (browser) {
    // Clear the store first to ensure clean state
    clearUserLeaderboardStore(season);

    try {
      const page = await userLeaderboardService.getUserLeaderboardData(pageInfo, season);
      if (page) {
        pageInfo = page.pagination;
      }
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
    } finally {
      loading = false;
    }
  }
  return {
    pageInfo,
    loading,
    season,
  };
};

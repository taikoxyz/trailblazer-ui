import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { userLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/dapps/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo<UserLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
    total: 0,
  };

  if (browser) {
    try {
      const page = await userLeaderboardService.getUserLeaderboardData(pageInfo, 2);
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
  };
};

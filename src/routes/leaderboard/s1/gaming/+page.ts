import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { gamingLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo<DappLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
    total: 0,
  };

  if (browser) {
    try {
      const page = await gamingLeaderboardService.getGamingLeaderboardData(pageInfo, 1);
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

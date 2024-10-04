import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { dappLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo<DappLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
  };

  if (browser) {
    try {
      const leaderboardPage = await dappLeaderboardService.getDappLeaderboardData(pageInfo, 1);
      if (leaderboardPage) pageInfo = leaderboardPage.pagination;
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

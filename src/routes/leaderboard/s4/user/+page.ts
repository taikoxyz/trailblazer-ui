import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { userLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import { currentUserLeaderboardUserEntry } from '$lib/domains/leaderboard/stores/userLeaderboard';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import getConnectedAddress from '$shared/utils/getConnectedAddress';

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
      const page = await userLeaderboardService.getUserLeaderboardData(pageInfo, 4);
      currentUserLeaderboardUserEntry.set(
        await userLeaderboardService.getUserLeaderboardDataForAddress(4, getConnectedAddress()),
      );
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

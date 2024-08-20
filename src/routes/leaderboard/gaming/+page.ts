import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { Leaderboard, type PaginationInfo } from '$libs/leaderboard';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: true,
    last: false,
  };

  if (browser) {
    try {
      pageInfo = await Leaderboard.getGamingLeaderboard(pageInfo);
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

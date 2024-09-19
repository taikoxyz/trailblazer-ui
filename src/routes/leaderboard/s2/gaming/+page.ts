import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { type DappLeaderboardItem, Leaderboard, type PaginationInfo } from '$libs/leaderboard';

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

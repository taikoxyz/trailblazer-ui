import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { type DappLeaderboardItem, type PaginationInfo } from '$libs/leaderboard';
import { DappsLeaderboardS2 } from '$libs/leaderboard/season-2/dapps/dappsLeaderboard';

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
      pageInfo = await DappsLeaderboardS2.getDappLeaderboard(pageInfo);
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

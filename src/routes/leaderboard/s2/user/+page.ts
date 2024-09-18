import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { type PaginationInfo, type UserLeaderboardItem } from '$libs/leaderboard';
import { UserLeaderboard } from '$libs/leaderboard/season-2/user/userLeaderboard';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo<UserLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
  };

  if (browser) {
    try {
      pageInfo = await UserLeaderboard.getUserLeaderboard(pageInfo);
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

import { browser } from '$app/environment';
import { Leaderboard, type PaginationInfo } from '$libs/leaderboard';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo = {
    page: 0,
    size: 20,
    first: true,
    last: false,
  };

  if (browser) {
    try {
      pageInfo = await Leaderboard.getDappLeaderboard(pageInfo);
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

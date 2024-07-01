import { browser } from '$app/environment';
import filterList from '$libs/leaderboard/json/filter.json';
import { Leaderboard, type PaginationInfo } from '$libs/leaderboard';

export const load = async () => {
  let pageInfo: PaginationInfo = {
    page: 0,
    size: 10 + Object.keys(filterList).length,
    total: 0,
    total_pages: 0,
    first: true,
    last: false,
  };

  if (browser) {
    try {
      pageInfo = await Leaderboard.getDappLeaderboard(pageInfo);
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
    }
  }
  return {
    pageInfo,
  };
};

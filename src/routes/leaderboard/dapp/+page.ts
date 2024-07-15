import { browser } from '$app/environment';
import { Leaderboard, type PaginationInfo } from '$libs/leaderboard';
// import filterList from '$libs/leaderboard/json/filter.json';

export const load = async () => {
  let pageInfo: PaginationInfo = {
    page: 1,
    size: 20,
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

import { get } from 'svelte/store';

import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { dappLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import { activeSeason } from '$lib/shared/stores/activeSeason';
import { type DappLeaderboardItem, type PaginationInfo } from '$libs/leaderboard';

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
      const page = await dappLeaderboardService.getDappLeaderboardData(pageInfo, get(activeSeason));
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

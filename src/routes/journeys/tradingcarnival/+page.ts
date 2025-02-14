import { get } from 'svelte/store';

import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { cexCompetitionService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import { type CexCompetitionRow, CexCompetitionType } from '$lib/domains/leaderboard/types/cex/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { activeSeason } from '$shared/stores/activeSeason';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo<CexCompetitionRow> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    first: 0,
    last: 1,
    total: 0,
  };

  if (browser) {
    try {
      const page = await cexCompetitionService.getCexCompetitionLeaderboard(
        pageInfo,
        CexCompetitionType.SPOT,
        get(activeSeason),
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

import { get } from 'svelte/store';

import { browser } from '$app/environment';
import { leaderboardConfig } from '$config';
import { liquidityCompetitionService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
import { currentLiquidityCompetitionLeaderboardUserEntry } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
import { activeSeason } from '$shared/stores/activeSeason';
import getConnectedAddress from '$shared/utils/getConnectedAddress';

export const load = async () => {
  let loading = true;
  let pageInfo: PaginationInfo<UserLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSizeXlarge,
    first: 0,
    last: 1,
    total: 0,
  };

  if (browser) {
    try {
      const page = await liquidityCompetitionService.getLiquidityCompetitionLeaderboard(pageInfo, get(activeSeason));
      currentLiquidityCompetitionLeaderboardUserEntry.set(
        await liquidityCompetitionService.getLiquidityCompetitionDataForAddress(
          get(activeSeason),
          getConnectedAddress(),
        ),
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

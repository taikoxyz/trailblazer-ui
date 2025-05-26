import { leaderboardConfig } from '$config';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { BasedLinerService } from '$lib/domains/preconf/service/BasedLinerService.js';
import { PRECONF_EVENT } from '$lib/domains/preconf/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async () => {
  let pageInfo: PaginationInfo<DappLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    total: 0,
  };

  try {
    const page = await BasedLinerService.fetchLeaderboard({
      eventId: PRECONF_EVENT.BASEDLINER,
      page: pageInfo.page,
    });
    if (page) {
      pageInfo = page.pagination;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    pageInfo,
  };
};

import { leaderboardConfig } from '$config';
import { liquidityServiceInstances } from '$lib/domains/leaderboard/services/server/LeaderboardServiceInstances.server';
import { LiquidityCompetitionType } from '$lib/domains/leaderboard/types/competition/types';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';

export const load = async ({ params }) => {
  let pageInfo: PaginationInfo<UserLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSizeXlarge,
    first: 0,
    last: 1,
    total: 0,
  };

  const { slug } = params;
  const edition = Number(slug) || 3;

  if (edition > 3) pageInfo.size = leaderboardConfig.pageSizeLarge;

  const ogService = liquidityServiceInstances[edition][LiquidityCompetitionType.OG];

  const defaultType = LiquidityCompetitionType.OG;
  if (!ogService) {
    throw new Error(`No service found for edition ${edition}`);
  }

  try {
    const page = await ogService.fetchCompetitionData({
      pagination: pageInfo,
      competitionType: LiquidityCompetitionType.OG,
      edition,
    });
    if (page) {
      pageInfo = page.pagination;
    }
  } catch (error) {
    console.error('Error fetching competition data:', error);
  }

  return {
    pageInfo,
    slug,
    edition,
    type: defaultType,
  };
};

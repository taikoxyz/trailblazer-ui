import { leaderboardConfig } from '$config';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { thrillblazerInstances } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances.server';
import { CompetitionType } from '$lib/domains/leaderboard/types/competition/types';
import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

export const load = async ({ params }) => {
  let pageInfo: PaginationInfo<DappLeaderboardItem> = {
    page: 0,
    size: leaderboardConfig.pageSize,
    total: 0,
  };

  const { slug } = params;
  const edition = Number(slug) || 1;

  const service = thrillblazerInstances[edition];
  if (!service) {
    throw new Error(`No service found for edition ${edition}`);
  }

  try {
    const page = await service.fetchCompetitionData({
      pagination: pageInfo,
      competitionType: CompetitionType.THRILLBLAZER,
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
  };
};

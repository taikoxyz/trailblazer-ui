import type { RequestHandler } from '@sveltejs/kit';

import { leaderboardConfig } from '$config';
import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
import { thrillblazerInstances } from '$lib/domains/leaderboard/services/server/LeaderboardServiceInstances.server';
import { DappCompetitionType } from '$lib/domains/leaderboard/types/competition/types';
import { getSeasonForThrillblazerEdition } from '$lib/domains/leaderboard/utils/mapEditionToSeason';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('thrillblazer/+server.ts');

export const GET: RequestHandler = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 0;
  const edition = Number(url.searchParams.get('edition')) || 1;
  const season = Number(url.searchParams.get('season')) || getSeasonForThrillblazerEdition(edition);

  const initialPagination: PaginationInfo<DappLeaderboardItem> = {
    page,
    size: leaderboardConfig.pageSize,
    total: 0,
  };

  log('Requesting data', { edition, season, initialPagination });
  try {
    const instance = thrillblazerInstances[edition];
    if (!instance) {
      throw new Error(`No instance for edition ${edition}`);
    }
    const leaderboardPage = await instance.fetchCompetitionData({
      pagination: initialPagination,
      competitionType: DappCompetitionType.THRILLBLAZER,
      edition,
    });
    return new Response(JSON.stringify(leaderboardPage));
  } catch (error) {
    log('Error fetching leaderboard data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
};

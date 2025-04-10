import type { Address } from 'viem';

import { leaderboardConfig } from '$config';
import { liquidityServiceInstances } from '$lib/domains/leaderboard/services/server/LeaderboardServiceInstances.server';
import { LiquidityCompetitionType } from '$lib/domains/leaderboard/types/competition/types';
import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import { getSeasonForLiquidityEdition } from '$lib/domains/leaderboard/utils/mapEditionToSeason';
import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
import { getLogger } from '$shared/utils/logger';

import type { RequestHandler } from './$types';

const log = getLogger('liquidity/+server.ts');

export const GET: RequestHandler = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 0;
  const edition = Number(url.searchParams.get('edition')) || 1;
  const season = Number(url.searchParams.get('season')) || getSeasonForLiquidityEdition(edition);
  const type = url.searchParams.get('type') || LiquidityCompetitionType.OG;
  const address = (url.searchParams.get('address') as Address) || null;

  const initialPagination: PaginationInfo<UserLeaderboardItem> = {
    page,
    size: season < 4 ? leaderboardConfig.pageSizeXlarge : leaderboardConfig.pageSizeLarge,
    total: 0,
  };

  try {
    const instance = liquidityServiceInstances[edition][type];
    if (!instance) {
      throw new Error(`No instance for edition ${edition}`);
    }
    const leaderboardPage = await instance.fetchCompetitionData({
      pagination: initialPagination,
      competitionType: LiquidityCompetitionType.OG,
      edition,
      address: address || undefined,
    });
    return new Response(JSON.stringify(leaderboardPage));
  } catch (error) {
    log('Error fetching leaderboard data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
};

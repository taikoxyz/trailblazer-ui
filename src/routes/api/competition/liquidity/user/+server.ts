import type { Address } from 'viem';

import { liquidityServiceInstances } from '$lib/domains/leaderboard/services/server/LeaderboardServiceInstances.server';
import { LiquidityCompetitionType } from '$lib/domains/leaderboard/types/competition/types';
import { getSeasonForLiquidityEdition } from '$lib/domains/leaderboard/utils/mapEditionToSeason';
import { getLogger } from '$shared/utils/logger';

import type { RequestHandler } from './$types';

const log = getLogger('liquidity/user/+server');

export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get('address') as Address;
  const edition = Number(url.searchParams.get('edition')) || 1;
  const season = Number(url.searchParams.get('season')) || getSeasonForLiquidityEdition(edition);
  const type: LiquidityCompetitionType =
    (url.searchParams.get('type') as LiquidityCompetitionType) || LiquidityCompetitionType.OG;

  try {
    const instance = liquidityServiceInstances[edition][type];
    if (!instance) throw new Error(`No instance for edition ${edition}`);
    const userRow = await instance.fetchCompetitionDataForAddress({
      address,
      edition,
      season,
      type,
    });
    return new Response(JSON.stringify(userRow));
  } catch (error) {
    log('Error fetching user leaderboard data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { status: 500 });
  }
};

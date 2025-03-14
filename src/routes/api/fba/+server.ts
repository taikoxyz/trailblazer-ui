import type { RequestHandler } from '@sveltejs/kit';
import { readContract } from '@wagmi/core';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$lib/shared/wagmi';
import { chainId } from '$lib/shared/utils/chain';
import { factionBattleArenaAbi, factionBattleArenaAddress } from '$generated/abi';

const log = getLogger('thrillblazer/+server.ts');

export const GET: RequestHandler = async ({ url }) => {
    /*
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
      competitionType: CompetitionType.THRILLBLAZER,
      edition,
    });
    return new Response(JSON.stringify(leaderboardPage));
  } catch (error) {
    log('Error fetching leaderboard data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }*/

    /**
     * todo:
     * - fetch leagueId from url
     * - fetch league seed from contract
     * - fetch league participants from graph
     * - calculate results board
     */


    const leagueId = Number(url.searchParams.get('leagueId')) || 1;
    log('Fetching league', {leagueId})
    let {openTime, executeTime, seed} = await readContract(wagmiConfig, {
        abi: factionBattleArenaAbi,
        address: factionBattleArenaAddress[chainId],
        functionName: 'getCurrentLeague',
       // args: [BigInt(leagueId)],
        chainId,
    })
openTime = new Date(Number(openTime) * 1000)
executeTime = new Date(Number(executeTime) * 1000)
seed = Number(seed)
    return new Response(JSON.stringify({openTime, executeTime, seed}));
/*
    const leagueParticipants = await fbaSubgraph.getLeagueParticipants(leagueId);

    const results = calculateResults(leagueSeed, leagueParticipants);

    return new Response(JSON.stringify(results));
*/
};

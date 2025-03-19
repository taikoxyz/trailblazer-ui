import type { RequestHandler } from '@sveltejs/kit';
import { readContract } from '@wagmi/core';

import { factionBattleArenaAbi, factionBattleArenaAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('thrillblazer/+server.ts');

export const GET: RequestHandler = async ({ url }) => {
  const leagueId = Number(url.searchParams.get('leagueId')) || 1;
  log('Fetching league', { leagueId });
  const { openTime, executeTime, seed } = await readContract(wagmiConfig, {
    abi: factionBattleArenaAbi,
    address: factionBattleArenaAddress[chainId],
    functionName: 'getCurrentLeague',
    chainId,
  });
  return new Response(
    JSON.stringify({
      openTime: new Date(Number(openTime) * 1000),
      executeTime: new Date(Number(executeTime) * 1000),
      seed: Number(seed),
    }),
  );
};

import { json } from '@sveltejs/kit';
import { isAddress } from 'ethereum-address';
import type { Address } from 'viem';

import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';

// GET /api/basedliner/leaderboard?address=0x...
export async function GET({ url }) {
  const address = url.searchParams.get('address') as Address;
  if (!address || !isAddress(address)) {
    return json({ error: 'Missing address parameter' }, { status: 400 });
  }
  try {
    const diff = await BasedLinerService.getTimingDiffForAddress(address);

    return json({ diff });
  } catch (e) {
    console.error('Error fetching timing diff for address:', e);
    return json({ error: e instanceof Error ? e.message : 'Failed to fetch timing diff' }, { status: 500 });
  }
}

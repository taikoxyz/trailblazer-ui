import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';

export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get('address');

  if (address) {
    // Fetch a single entry for the address
    const entry = await BasedLinerService.getLeaderboardEntry({
      address,
    });
    return json({ entry });
  }

  // Fetch the full leaderboard
  const entries = await BasedLinerService.getLeaderboard({});
  return json({ entries });
};

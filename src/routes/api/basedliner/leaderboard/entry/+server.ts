import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';

// api/basedliner/leaderboard/entry
export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get('address');
  // page param is currently unused, but parsed for future extensibility
  // const page = Number(url.searchParams.get('page')) || 0;
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

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const address = body.address;
  // page param is currently unused, but parsed for future extensibility
  // const page = Number(body.page) || 0;
  // calling leaderboard entry api (POST), address
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

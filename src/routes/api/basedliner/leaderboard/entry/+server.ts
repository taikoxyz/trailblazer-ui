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
  const result = await BasedLinerService.getLeaderboard({});
  // Check if result is a single entry or a list
  if ('items' in result) {
    return json({ entries: result.items, total: result.total });
  }
  // Single entry case (shouldn't happen without address, but handle it)
  return json({ entries: result ? [result] : [], total: result ? 1 : 0 });
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const address = body.address;
  const page = Number(body.page) || 0;

  if (address) {
    // Fetch a single entry for the address
    const entry = await BasedLinerService.getLeaderboardEntry({
      address,
    });
    return json({ entry });
  }

  // Fetch the full leaderboard with pagination
  const result = await BasedLinerService.getLeaderboard({ page });
  // Check if result is a single entry or a list
  if ('items' in result) {
    return json({ entries: result.items, total: result.total });
  }
  // Single entry case (shouldn't happen without address, but handle it)
  return json({ entries: result ? [result] : [], total: result ? 1 : 0 });
};

import { json } from '@sveltejs/kit';

import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';

// GET /api/preconf/diff
export async function GET({ url }) {
  const address = url.searchParams.get('address');
  if (address) {
    // If address is provided, return timing diff for that address
    try {
      const diff = await BasedLinerService.getTimingDiffForAddress(address);
      return json({ diff });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to fetch timing diff';
      return json({ error: errorMessage }, { status: 500 });
    }
  } else {
    // If no address, return all timing diffs (leaderboard)
    try {
      const diffs = await BasedLinerService.getAllTimingDiffs();
      return json({ diffs });
    } catch (e) {
      console.error('Error fetching all timing diffs:', e);
      const errorMessage = e instanceof Error ? e.message : 'Failed to fetch timing diffs';
      return json({ error: errorMessage }, { status: 500 });
    }
  }
}

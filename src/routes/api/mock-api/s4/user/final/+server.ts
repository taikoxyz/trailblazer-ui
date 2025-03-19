import { json } from '@sveltejs/kit';

import type { UserFinalScoreResponse } from '$lib/domains/profile/dto/profile.dto';

export function GET({ url }) {
  const address = url.searchParams.get('address');
  if (!address) throw new Error('address is required');

  return json({
    score: 100,
    multiplier: 2,
    total: 200,
  } satisfies UserFinalScoreResponse);
}

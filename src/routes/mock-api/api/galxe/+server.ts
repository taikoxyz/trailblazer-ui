import { json } from '@sveltejs/kit';

import type { GalxePointsResponse } from '$libs/galxe';

export function GET({ url }) {
  const address = url.searchParams.get('address');
  if (!address) throw new Error('address is required');

  return json({
    address,
    value: 999,
  } satisfies GalxePointsResponse);
}

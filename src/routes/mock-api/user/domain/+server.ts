import { json } from '@sveltejs/kit';

import type { DomainResponse } from '$libs/domain';

export function GET({ url }) {
  const address = url.searchParams.get('address');
  if (!address) throw new Error('address is required');

  return json({
    address,
    dotTaiko: 'trailblazers.taiko',
    zns: 'trailblazer.🥁',
  } satisfies DomainResponse);
}

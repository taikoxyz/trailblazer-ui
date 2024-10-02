import { json } from '@sveltejs/kit';
import type { Address } from 'viem';

import type { BonusDTO } from '$lib/domains/profile/dto/bonus.dto';

export function GET({ url }) {
  const address = url.searchParams.get('address') as Address;
  if (!address) throw new Error('address is required');

  return json({
    address,
    value: 1234.5678,
  } satisfies BonusDTO);
}

import { json } from '@sveltejs/kit';

import type { BonusDTO } from '$lib/domains/profile/dto/bonus.dto.js';

export function GET({ url }) {
  const address = url.searchParams.get('address');
  if (!address) throw new Error('address is required');

  return json({
    address: '0xFE5124f99f544a84C3C6D0A26339a04937cD2Ff4',
    value: 1000.12345,
  } satisfies BonusDTO);
}

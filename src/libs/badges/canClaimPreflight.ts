import type { Address } from 'viem';

import { PUBLIC_ENV } from '$env/static/public';

export default async function canClaimPreflight(address: Address, badgeId: number): Promise<boolean> {
  if (PUBLIC_ENV === 'development') {
    return true;
  }
  try {
    const baseUrl = 'https://qa.trailblazer.taiko.xyz/whitelist?address=';
    const res = await fetch(`${baseUrl}${address}&badgeId=${badgeId}`);
    const json = await res.json();

    return json && json.whitelisted;
  } catch (e) {
    console.error('Error fetching claim preflight:', e);
    return false;
  }
}

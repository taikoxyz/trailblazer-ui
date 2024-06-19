import type { Address } from 'viem';

import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

export default async function canClaimPreflight(address: Address, badgeId: number): Promise<boolean> {
  if (isDevelopmentEnv) {
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

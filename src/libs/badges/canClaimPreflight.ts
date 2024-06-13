import type { Address } from 'viem';

export default async function canClaimPreflight(address: Address, badgeId: number): Promise<boolean> {
  try {
    const baseUrl = 'https://trailblazer.hekla.taiko.xyz/whitelist?address=';
    const res = await fetch(`${baseUrl}/${address}&badgeId=${badgeId}`);
    const json = await res.json();

    return json && json.whitelisted;
  } catch (e) {
    console.error('Error fetching claim preflight:', e);
    return false;
  }
}

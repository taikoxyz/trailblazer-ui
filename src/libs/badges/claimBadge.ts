import type { Address } from 'viem';

import type { FACTIONS } from '$configs/badges';

import getMintSignature from './getMintSignature';
import mint from './mint';

export default async function claimBadge(address: Address, factionId: FACTIONS) {
  const signature = await getMintSignature(address, factionId);
  await mint(address, factionId, signature);
}

import type { Address } from 'viem';

import type { FACTIONS } from '$configs/badges';

import getMintSignature from './getMintSignature';
import isSignatureValid from './isSignatureValid';
import mint from './mint';

export default async function claimBadge(address: Address, factionId: FACTIONS) {
  const { signature } = await getMintSignature(address, factionId);
  console.info({signature})
  const isValid = await isSignatureValid(signature, address, factionId);
  console.info({isValid})
  await mint(address, factionId, signature);
}

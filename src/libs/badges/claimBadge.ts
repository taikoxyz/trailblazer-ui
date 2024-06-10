import type { Address } from 'viem';

import type { FACTIONS } from '$configs/badges';

import getMintSignature, { mockSignHash } from './getMintSignature';
import mint from './mint';
import { canMint } from './canMint';
import isSignatureValid from './isSignatureValid';

export default async function claimBadge(address: Address, factionId: FACTIONS) {
  const { signature, hash } = await getMintSignature(address, factionId);
  console.log('claimBadge', { address, factionId, signature });

  const mockSignature = await mockSignHash(hash);
  console.log({ mockSignature, signature, hash });
  const isValid = await isSignatureValid(signature, address, factionId);
  console.log('isValid', { isValid });

  const couldMint = await canMint(signature, address, factionId);
  console.log('couldMint', { couldMint });
  await mint(address, factionId, signature);
}

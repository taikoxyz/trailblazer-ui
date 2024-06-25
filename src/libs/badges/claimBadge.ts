/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Address } from 'viem';

import type { FACTIONS } from '$configs/badges';

import type { IContractData } from '../../types/types';
import getMintSignature from './getMintSignature';
import isSignatureValid from './isSignatureValid';
import mint from './mint';

export default async function claimBadge(address: Address, factionId: FACTIONS) {
  let signature: IContractData | undefined;
  try {
    const res = await getMintSignature(address, factionId);
    signature = res.signature;
  } catch (e: any) {
    console.error('getMintSignature Error', e);
    throw new Error('Failed to fetch mint signature.');
  }

  const isValidSigner = await isSignatureValid(signature, address, factionId);
  if (!isValidSigner) throw new Error('Cannot verify signature origin.');

  try {
    await mint(address, factionId, signature);
  } catch (e: any) {
    const { shortMessage } = e;
    if (
      shortMessage ===
      'The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.'
    ) {
      throw new Error('You do not have enough ETH to cover the minting cost, please bridge some ETH to Taiko.');
    } else {
      throw new Error(e.shortMessage);
    }
  }
}

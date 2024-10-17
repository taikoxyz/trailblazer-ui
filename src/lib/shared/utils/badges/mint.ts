import { writeContract } from '@wagmi/core';
import type { Address } from 'viem';

import { FACTIONS } from '$configs/badges';
import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { pendingTransactions } from '$lib/shared/stores/pendingTransactions';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import isSignatureValid from './isSignatureValid';

export default async function mint(address: Address, factionId: FACTIONS, signature: Address): Promise<string> {
  // ensure locally that the signature is valid before calling metamask
  const signatureValid = await isSignatureValid(signature, address, factionId);

  if (!signatureValid) {
    throw new Error('Invalid signature');
  }

  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'mint',
    args: [signature, BigInt(factionId)],
    chainId,
  });
  await pendingTransactions.add(tx);

  return tx;
}

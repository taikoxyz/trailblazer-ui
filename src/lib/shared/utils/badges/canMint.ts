import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi/';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

export async function canMint(signature: Address, address: Address, factionId: number): Promise<boolean> {
  const contractAddress = trailblazersBadgesAddress[chainId];

  const result = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'canMint',
    args: [signature, address, BigInt(factionId)],
    chainId,
  });

  return result;
}

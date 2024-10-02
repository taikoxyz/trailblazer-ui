import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';

export async function getTokenId(address: Address, factionId: number): Promise<number> {
  const contractAddress = trailblazersBadgesAddress[chainId];

  const result = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getTokenId',
    args: [address, BigInt(factionId)],
    chainId,
  });

  return parseInt(result.toString(16), 16);
}

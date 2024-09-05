import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress, trailblazersBadgesS2Address } from '../../generated/abi';

export async function isApprovedForAllS2(address: Address): Promise<boolean> {
  const contractAddress = trailblazersBadgesAddress[chainId];
  const s2ContractAddress = trailblazersBadgesS2Address[chainId];

  return await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'isApprovedForAll',
    args: [address, s2ContractAddress],
    chainId,
  });
}

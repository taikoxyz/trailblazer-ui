import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { wagmiConfig } from '$libs/wagmi';
import type { IChainId } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';
import type { Movements } from './const';

export default async function getMovement(address: Address): Promise<Movements> {
  const chainId = 167000 as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];

  const result = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'movements',
    args: [address],
    chainId,
  });

  const movementId = parseInt(result.toString());
  return movementId as Movements;
}

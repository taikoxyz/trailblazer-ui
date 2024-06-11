import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { web3modal } from '$libs/connect';
import { config } from '$libs/wagmi';
import type { IChainId } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';

export async function balanceOf(address: Address): Promise<number> {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return 0;

  const chainId = selectedNetworkId as IChainId;
  const result = await readContract(config, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'balanceOf',
    args: [address],
    chainId,
  });

  return parseInt(result.toString());
}

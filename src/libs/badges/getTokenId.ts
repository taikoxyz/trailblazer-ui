import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { FactionNames, FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { config } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';

export async function getTokenId(address: Address, factionId: number): Promise<number> {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return -1;

  const chainId = selectedNetworkId as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];

  const result = await readContract(config, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getTokenId',
    args: [address, BigInt(factionId)],
    chainId,
  });

  return parseInt(result.toString(16), 16);
}

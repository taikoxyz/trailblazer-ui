import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';

export async function canMint(signature: IContractData, address: Address, factionId: number): Promise<boolean> {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return false;

  const chainId = selectedNetworkId as IChainId;
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

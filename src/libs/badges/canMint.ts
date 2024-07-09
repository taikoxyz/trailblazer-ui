import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';
import type { IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';

export async function canMint(signature: IContractData, address: Address, factionId: number): Promise<boolean> {
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

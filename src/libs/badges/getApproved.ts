import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';
import { getTokenId } from './getTokenId';

export async function getApproved(address: Address, factionId: number): Promise<Address> {
  const contractAddress = trailblazersBadgesAddress[chainId];

  const tokenId = await getTokenId(address, factionId);

  const approvedAccount = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getApproved',
    args: [BigInt(tokenId)],
    chainId,
  });

  return approvedAccount;
}

import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

export default async function approve(address: Address, tokenId: number): Promise<Address> {
  const txHash = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'approve',
    args: [address, BigInt(tokenId)],
    chainId,
  });

  return txHash;
}

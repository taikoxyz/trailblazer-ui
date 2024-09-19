import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

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

import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

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

import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

export default async function setApprovalForAll(address: Address): Promise<Address> {
  const txHash = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'setApprovalForAll',
    args: [address, true],
    chainId,
  });

  return txHash;
}

import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain/chains';
import { wagmiConfig } from '$lib/shared/wagmi';

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

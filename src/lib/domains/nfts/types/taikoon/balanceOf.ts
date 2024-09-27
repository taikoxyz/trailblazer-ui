import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { taikoonTokenAbi, taikoonTokenAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

export async function balanceOf(address: Address): Promise<number> {
  const result = await readContract(wagmiConfig, {
    abi: taikoonTokenAbi,
    address: taikoonTokenAddress[chainId],
    functionName: 'balanceOf',
    args: [address],
    chainId,
  });

  return parseInt(result.toString());
}

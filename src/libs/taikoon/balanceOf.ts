import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { taikoonTokenAbi, taikoonTokenAddress } from '../../generated/abi/';

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

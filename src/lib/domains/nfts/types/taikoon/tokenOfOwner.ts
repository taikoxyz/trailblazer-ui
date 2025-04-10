import { readContracts } from '@wagmi/core';
import type { Address } from 'viem';

import { taikoonTokenAbi, taikoonTokenAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { balanceOf } from './balanceOf';

export async function tokenOfOwner(address: Address): Promise<number[]> {
  const balance = await balanceOf(address);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = { contracts: [] } as any;

  for (const tokenIdx of Array(balance).keys()) {
    params.contracts.push({
      abi: taikoonTokenAbi,
      address: taikoonTokenAddress[chainId],
      functionName: 'tokenOfOwnerByIndex',
      args: [address, BigInt(tokenIdx)],
      chainId,
    });
  }

  const results = await readContracts(wagmiConfig, params);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results.map((item: any) => parseInt(item.result.toString()));
}

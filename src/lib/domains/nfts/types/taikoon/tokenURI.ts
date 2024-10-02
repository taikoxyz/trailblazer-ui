import { readContract } from '@wagmi/core';

import { taikoonTokenAbi, taikoonTokenAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

export async function tokenURI(tokenId: number): Promise<string> {
  const result = await readContract(wagmiConfig, {
    abi: taikoonTokenAbi,
    address: taikoonTokenAddress[chainId],
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
    chainId,
  });

  return result as string;
}

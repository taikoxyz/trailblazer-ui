import { readContract } from '@wagmi/core';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { taikoonTokenAbi, taikoonTokenAddress } from '../../generated/abi/';

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

import { readContract } from '@wagmi/core';
import { type Address, parseEther } from 'viem';

import { erc20AirdropAbi, erc20AirdropAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import preflight from './preflight';

export default async function hasClaimed(address: Address): Promise<boolean> {
  try {
    const { value } = await preflight(address);

    const res = await readContract(wagmiConfig, {
      abi: erc20AirdropAbi,
      address: erc20AirdropAddress[chainId],
      functionName: 'hasClaimed',
      args: [address, parseEther(value.toString())],
    });

    return res;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

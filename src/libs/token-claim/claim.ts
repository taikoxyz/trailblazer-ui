import { writeContract } from '@wagmi/core';
import { type Address, parseEther } from 'viem';

import { erc20AirdropAbi, erc20AirdropAddress } from '$generated/abi';

import canClaim from './canClaim';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

export default async function claim(address: Address, amount: number, proof: string): Promise<void> {
  const can = await canClaim(address, amount);

  if (!can) {
    throw new Error('Cannot claim');
  }

  await writeContract(wagmiConfig, {
    abi: erc20AirdropAbi,
    address: erc20AirdropAddress[chainId],
    functionName: 'claim',
    args: [parseEther(amount.toString()), JSON.parse(proof)],
  });

  return;
}

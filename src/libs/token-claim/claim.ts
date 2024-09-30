import { writeContract } from '@wagmi/core';
import { type Address, parseEther } from 'viem';

import { erc20AirdropAbi, erc20AirdropAddress } from '$generated/abi';
import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

export default async function claim(address: Address, amount: number, proof: string): Promise<void> {
  await writeContract(wagmiConfig, {
    abi: erc20AirdropAbi,
    address: erc20AirdropAddress[chainId],
    functionName: 'claim',
    args: [address, parseEther(amount.toString()), JSON.parse(proof)],
  });

  return;
}

import { readContract } from '@wagmi/core';
import { type Address, parseEther } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { erc20AirdropAbi, erc20AirdropAddress } from '../../generated/abi/';

export default async function canClaim(user: Address, amount: number): Promise<boolean> {
  const contractAddress = erc20AirdropAddress[chainId];

  const approvedAccount = await readContract(wagmiConfig, {
    abi: erc20AirdropAbi,
    address: contractAddress,
    functionName: 'canClaim',
    args: [user, parseEther(amount.toString())],
    chainId,
  });

  return approvedAccount;
}

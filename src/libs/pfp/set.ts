import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';
import { pendingTransactions } from '$stores/pendingTransactions';

import { registerProfilePictureAbi, registerProfilePictureAddress } from '../../generated/abi';

export default async function set(contract: Address, tokenId: number): Promise<string> {
  const tx = await writeContract(wagmiConfig, {
    abi: registerProfilePictureAbi,
    address: registerProfilePictureAddress[chainId],
    functionName: 'setPFP',
    args: [contract, BigInt(tokenId)],
    chainId,
  });

  await pendingTransactions.add(tx);

  return tx;
}

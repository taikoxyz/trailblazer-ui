import { writeContract } from '@wagmi/core';
import { get } from 'svelte/store';
import { type Address, parseEther } from 'viem';

import { erc20AirdropAbi, erc20AirdropAddress } from '$generated/abi';
import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { activeSeason } from '$shared/stores/activeSeason';
import { pendingTransactions } from '$shared/stores/pendingTransactions';

export default async function claim(address: Address, amount: number, proof: string): Promise<void> {
  const blacklisted = await profileService.getBlacklistStatus(address, get(activeSeason));
  if (blacklisted) {
    throw new Error('You are blacklisted');
  }
  const tx = await writeContract(wagmiConfig, {
    abi: erc20AirdropAbi,
    address: erc20AirdropAddress[chainId],
    functionName: 'claim',
    args: [address, parseEther(amount.toString()), JSON.parse(proof)],
  });
  await pendingTransactions.add(tx);
}

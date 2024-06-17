import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { parseGwei } from 'viem';

import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import type { Movements } from './const';

export default async function setMovement(movement: Movements) {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return;

  const chainId = selectedNetworkId as IChainId;

  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'setMovement',
    args: [BigInt(movement)],
    chainId: chainId as number,
    gasPrice: parseGwei('0.01'),
  });
  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });
  return receipt;
}

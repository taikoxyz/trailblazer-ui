import { waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { web3modal } from '$libs/connect';
import calculateGasPrice from '$libs/util/calculateGasPrice';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import type { Movements } from './const';

export default async function setMovement(movement: Movements) {
  try {
    const { selectedNetworkId } = web3modal.getState();
    if (!selectedNetworkId) return;

    const chainId = selectedNetworkId as IChainId;

    const tx = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'setMovement',
      args: [BigInt(movement)],
      chainId: chainId as number,
      gasPrice: await calculateGasPrice(),
    });
    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });
    return receipt;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.shortMessage);
  }
}

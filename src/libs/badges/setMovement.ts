import { waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { chainId } from '$libs/chain';
import calculateGasPrice from '$libs/util/calculateGasPrice';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import type { Movements } from './const';

export default async function setMovement(movement: Movements) {
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
}

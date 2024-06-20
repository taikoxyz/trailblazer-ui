import { waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import type { Movements } from './const';

export default async function setMovement(movement: Movements) {
  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'setMovement',
    args: [BigInt(movement)],
    chainId,
  });
  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });
  return receipt;
}

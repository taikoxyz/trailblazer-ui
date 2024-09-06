import { writeContract } from '@wagmi/core';

import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';
import { pendingTransactions } from '$stores/pendingTransactions';

import { trailblazersBadgesS2Abi, trailblazersBadgesS2Address } from '../../generated/abi';

export default async function tamperMigration(type: 'pink' | 'purple'): Promise<void> {
  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesS2Abi,
    address: trailblazersBadgesS2Address[chainId],
    functionName: 'tamperMigration',
    args: [type === 'pink'],
    chainId,
  });
  await pendingTransactions.add(tx);
}

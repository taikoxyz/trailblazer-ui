import { writeContract } from '@wagmi/core';

import { trailblazersBadgesS2Abi, trailblazersBadgesS2Address } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { pendingTransactions } from '$stores/pendingTransactions';

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

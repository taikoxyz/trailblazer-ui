import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { FACTIONS } from '$configs/badges';
import { trailblazersBadgesS2Abi, trailblazersBadgesS2Address } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { pendingTransactions } from '$stores/pendingTransactions';

import isApprovedToMigrate from './isApprovedToMigrate';

export default async function startMigration(address: Address, factionId: FACTIONS): Promise<string> {
  const s2ContractAddress = trailblazersBadgesS2Address[chainId];

  const isApproved = await isApprovedToMigrate(address, factionId);
  if (!isApproved) {
    throw new Error(`Season 2 contract [${s2ContractAddress}] is not approved`);
  }

  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesS2Abi,
    address: s2ContractAddress,
    functionName: 'startMigration',
    args: [BigInt(factionId)],
    chainId,
  });

  await pendingTransactions.add(tx);

  return tx;
}

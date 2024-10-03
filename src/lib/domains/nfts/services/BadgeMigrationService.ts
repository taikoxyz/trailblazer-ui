import { readContract, writeContract } from '@wagmi/core';
import type { Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain/chains';
import { wagmiConfig } from '$lib/shared/wagmi';
import { getLogger } from '$libs/util/logger';

import { BadgeMigrationAdapter } from '../adapter/BadgeMigrationAdapter';

const log = getLogger('BadgeMigrationService');

export class BadgeMigrationService {
  private adapter: BadgeMigrationAdapter;

  constructor(adapter?: BadgeMigrationAdapter) {
    this.adapter = adapter || new BadgeMigrationAdapter();
  }

  async getEnabledMigrations(): Promise<number[]> {
    log('getEnabledMigrations');
    return this.adapter.fetchEnabledMigrations();
  }

  async setApprovalForAll(address: Address): Promise<string> {
    log('setApprovalForAll', { address });

    const txHash = await writeContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'setApprovalForAll',
      args: [address, true],
      chainId,
    });

    return txHash;
  }

  async getApprovalForAll(address: Address): Promise<boolean> {
    log('getApprovalForAll', { address });

    const isApproved = await readContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: trailblazersBadgesAddress[chainId],
      functionName: 'isApprovedForAll',
      args: [address, address],
      chainId,
    });

    return isApproved;
  }
}

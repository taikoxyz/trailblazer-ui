import type { Address } from 'viem';

import { BadgeMigrationAdapter } from '$lib/domains/badges/adapter/BadgeMigrationAdapter';
import type { Movements } from '$lib/domains/profile/types/types';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('BadgeMigrationService');

export class BadgeMigrationService {
  private adapter: BadgeMigrationAdapter;

  constructor(migrationAdapter?: BadgeMigrationAdapter) {
    this.adapter = migrationAdapter || new BadgeMigrationAdapter();
  }

  async getEnabledMigrations(): Promise<number[]> {
    log('getEnabledMigrations');
    return this.adapter.fetchEnabledMigrations();
  }

  async startMigration(address: Address, nft: NFT): Promise<NFT> {
    log('startMigration', { address, nft });
    return this.adapter.startMigration(address, nft);
  }

  async refineMigration(address: Address, nft: NFT, selectedMovement: Movements): Promise<NFT> {
    log('refineMigration', { address, nft, selectedMovement });
    return this.adapter.refineMigration(address, nft, selectedMovement);
  }

  async endMigration(address: Address, nft: NFT): Promise<NFT> {
    log('endMigration', { address, nft });
    return this.adapter.endMigration(address, nft);
  }

  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });
    return this.adapter.getMigrationStatus(address);
  }
}

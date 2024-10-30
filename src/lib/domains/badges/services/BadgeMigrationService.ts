import type { Address } from 'viem';

import { BadgeMigrationAdapter } from '$lib/domains/badges/adapter/BadgeMigrationAdapter';
import type { Movements } from '$lib/domains/profile/types/types';
import { type ActiveBadgeMigration, MigrationStatus } from '$lib/shared/types/BadgeMigration';
import { activeMigration } from '$shared/stores/migration';
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

  async startMigration(address: Address, nft: NFT, migration: ActiveBadgeMigration): Promise<ActiveBadgeMigration> {
    log('startMigration', { address, nft, migration });
    return this.adapter.startMigration(address, nft, migration);
  }

  async refineMigration(
    address: Address,
    nft: NFT,
    selectedMovement: Movements,
    migration: ActiveBadgeMigration,
  ): Promise<ActiveBadgeMigration> {
    log('refineMigration', { address, nft, selectedMovement });
    return this.adapter.refineMigration(address, nft, selectedMovement, migration);
  }

  async endMigration(address: Address, nft: NFT, migration: ActiveBadgeMigration): Promise<ActiveBadgeMigration> {
    log('endMigration', { address, nft, migration });
    return this.adapter.endMigration(address, nft, migration);
  }

  async getMigrationStatus(address: Address): Promise<ActiveBadgeMigration[]> {
    log('getMigrationStatus', { address });
    const migrations = await this.adapter.getMigrationStatus(address);
    const foundActive = migrations.find(
      (migration) =>
        migration.status === MigrationStatus.STARTED ||
        migration.status === MigrationStatus.CAN_REFINE ||
        migration.status === MigrationStatus.CAN_CLAIM,
    );

    activeMigration.set(foundActive as ActiveBadgeMigration);
    return migrations as ActiveBadgeMigration[];
  }
}

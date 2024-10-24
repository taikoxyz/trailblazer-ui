import type { Address } from 'viem';

import { BadgeMigrationAdapter } from '$lib/domains/badges/adapter/BadgeMigrationAdapter';
import type { Movements } from '$lib/domains/profile/types/types';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

import { BadgeS1Service } from './BadgeS1Service';

const log = getLogger('BadgeMigrationService');

export class BadgeMigrationService {
  private migrationAdapter: BadgeMigrationAdapter;
  private badgeAdapter: BadgeS1Service;

  constructor(migrationAdapter?: BadgeMigrationAdapter, badgeAdapter?: BadgeS1Service) {
    this.migrationAdapter = migrationAdapter || new BadgeMigrationAdapter();
    this.badgeAdapter = badgeAdapter || new BadgeS1Service();
  }

  async getEnabledMigrations(): Promise<number[]> {
    log('getEnabledMigrations');
    return this.migrationAdapter.fetchEnabledMigrations();
  }

  async startMigration(factionId: number): Promise<string> {
    log('startMigration', { factionId });
    return this.migrationAdapter.startMigration(factionId);
  }

  async refineMigration(address: Address, factionId: number, movement: Movements): Promise<string> {
    log('refineMigration', { movement });
    return this.migrationAdapter.refineMigration(address, factionId, movement);
  }

  async endMigration(address: Address, nft: NFT): Promise<NFT> {
    log('endMigration', { address, nft });
    return this.migrationAdapter.endMigration(address, nft);
  }

  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });
    return this.migrationAdapter.getMigrationStatus(address);
  }
}

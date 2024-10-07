import type { Address } from 'viem';

import { getLogger } from '$libs/util/logger';

import { BadgeAdapter } from '../adapter/BadgeAdapter';
import { BadgeMigrationAdapter } from '../adapter/BadgeMigrationAdapter';

const log = getLogger('BadgeMigrationService');

export class BadgeMigrationService {
  private migrationAdapter: BadgeMigrationAdapter;
  private badgeAdapter: BadgeAdapter;

  constructor(migrationAdapter?: BadgeMigrationAdapter, badgeAdapter?: BadgeAdapter) {
    this.migrationAdapter = migrationAdapter || new BadgeMigrationAdapter();
    this.badgeAdapter = badgeAdapter || new BadgeAdapter();
  }

  async getEnabledMigrations(): Promise<number[]> {
    log('getEnabledMigrations');
    return this.migrationAdapter.fetchEnabledMigrations();
  }

  async setApprovalForAll(): Promise<string> {
    log('setApprovalForAll');
    return this.migrationAdapter.setApprovalForAll();
  }

  async getApprovalForAll(address: Address): Promise<boolean> {
    log('getApprovalForAll', { address });
    return this.migrationAdapter.getApprovalForAll(address);
  }

  async getApproved(address: Address, factionId: number): Promise<Address> {
    log('getApproved', { address, factionId });
    return this.migrationAdapter.getApproved(this.badgeAdapter, address, factionId);
  }

  async approve(tokenId: number): Promise<Address> {
    log('approve', { tokenId });
    return this.migrationAdapter.approve(tokenId);
  }

  async startMigration(factionId: number): Promise<string> {
    log('startMigration', { factionId });
    return this.migrationAdapter.startMigration(factionId);
  }

  async getMigrationStatus(address: Address): Promise<number[]> {
    log('getMigrationStatus', { address });
    return this.migrationAdapter.getMigrationStatus(address);
  }
}

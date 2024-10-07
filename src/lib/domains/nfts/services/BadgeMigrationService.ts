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

  async setApprovalForAll(address: Address): Promise<string> {
    log('setApprovalForAll', { address });
    return this.migrationAdapter.setApprovalForAll(address);
  }

  async getApprovalForAll(address: Address): Promise<boolean> {
    log('getApprovalForAll', { address });
    return this.migrationAdapter.getApprovalForAll(address);
  }

  async getApproved(address: Address, factionId: number): Promise<Address> {
    log('getApproved', { address, factionId });
    return this.migrationAdapter.getApproved(this.badgeAdapter, address, factionId);
  }

  async approve(address: Address, tokenId: number): Promise<Address> {
    log('approve', { address, tokenId });
    return this.migrationAdapter.approve(address, tokenId);
  }
}

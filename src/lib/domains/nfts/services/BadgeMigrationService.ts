import type { Address } from 'viem';

import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
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

  async approve(tokenId: number): Promise<Address> {
    log('approve', { tokenId });
    return this.migrationAdapter.approve(tokenId);
  }

  async startMigration(factionId: number): Promise<string> {
    log('startMigration', { factionId });
    return this.migrationAdapter.startMigration(factionId);
  }

  async tamperMigration(pinkOrPurple: boolean): Promise<string> {
    log('tamperMigration', { pinkOrPurple });
    return this.migrationAdapter.tamperMigration(pinkOrPurple);
  }

  async endMigration(address: Address, factionId: number): Promise<string> {
    log('endMigration', { address, factionId });
    return this.migrationAdapter.endMigration(address, factionId);
  }

  async getApprovedMigrations(address: Address): Promise<number[]> {
    log('getApprovedMigrations', { address });
    return this.migrationAdapter.getApprovedMigrations(address);
  }

  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });
    return this.migrationAdapter.getMigrationStatus(address);
  }
}

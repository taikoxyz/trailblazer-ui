import type { Address } from 'viem';

import type { Movements } from '$lib/domains/profile/types/types';
import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import { getLogger } from '$shared/utils/logger';

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

  async startMigration(factionId: number): Promise<string> {
    log('startMigration', { factionId });
    return this.migrationAdapter.startMigration(factionId);
  }

  async tamperMigration(address: Address, factionId: number, tamperMovement: Movements): Promise<string> {
    log('tamperMigration', { tamperMovement });
    return this.migrationAdapter.tamperMigration(address, factionId, tamperMovement);
  }

  async endMigration(address: Address, factionId: number): Promise<string> {
    log('endMigration', { address, factionId });
    return this.migrationAdapter.endMigration(address, factionId);
  }

  async getMigrationStatus(address: Address): Promise<BadgeMigration[]> {
    log('getMigrationStatus', { address });
    return this.migrationAdapter.getMigrationStatus(address);
  }
}

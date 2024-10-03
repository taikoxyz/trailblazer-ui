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
}

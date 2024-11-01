import type { IBadgeMigration } from '$lib/shared/types/BadgeMigration';

export enum FACTIONS {
  Ravers,
  Robots,
  Bouncers,
  Masters,
  Monks,
  Androids,
  Drummers,
  Shinto,
}
export enum FactionNames {
  Ravers = 'Ravers',
  Robots = 'Robots',
  Bouncers = 'Bouncers',
  Masters = 'Masters',
  Monks = 'Monks',
  Androids = 'Androids',
  Drummers = 'Drummers',
  Shinto = 'Shinto',
}

// return type for getMigrationStatus
export interface GetMigrationStatusResult {
  approvedTokenIds: number[];
  migrations: IBadgeMigration[];
}

import type { ActiveBadgeMigration } from '$lib/shared/types/BadgeMigration';

export type UserBadgeMigrations = {
  //approvedMigrationBadgeIds: number[];
  badgeMigrations: ActiveBadgeMigration[];
};

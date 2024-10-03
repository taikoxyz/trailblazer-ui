import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';

export type UserBadgeMigrations = {
  approvedMigrationBadgeIds: number[];
  badgeMigrations: BadgeMigration[];
};

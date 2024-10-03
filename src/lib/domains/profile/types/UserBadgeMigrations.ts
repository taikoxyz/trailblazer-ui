import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';

export type UserBadgeMigrations = {
  isSetApprovalForAll: boolean;
  badgeMigrations: BadgeMigration[];
};

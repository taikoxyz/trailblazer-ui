import { writable } from 'svelte/store';

import type { IBadgeMigration } from '$shared/types/BadgeMigration';

export const activeMigration = writable<IBadgeMigration | null>(null);

export const refineMigrationModal = writable<boolean>(false);
export const startMigrationModal = writable<boolean>(false);
export const migrationApprovalModal = writable<boolean>(false);
export const endMigrationModal = writable<boolean>(false);

import { writable } from 'svelte/store';

export interface IBadgeMigration {
  s1BadgeId: number;
}

export const badgeMigrationStore = writable<IBadgeMigration>({
  s1BadgeId: -1,
});

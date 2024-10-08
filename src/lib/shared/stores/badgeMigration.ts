import { writable } from 'svelte/store';

export interface IBadgeMigration {
  s1BadgeId: number;
  //s2BadgeId: number;
  isStarted: boolean;
  isCompleted: boolean;
  pinkTampers: number;
  purpleTampers: number;
  claimExpiration?: Date;
  tamperExpiration?: Date;
}

export const badgeMigrationStore = writable<IBadgeMigration>({
  s1BadgeId: -1,
  isStarted: false,
  isCompleted: false,
  pinkTampers: 0,
  purpleTampers: 0,
  claimExpiration: new Date(),
  tamperExpiration: new Date(),
});

import { writable } from 'svelte/store';

import type { BadgeMigration } from '$lib/shared/types/BadgeMigration';
import type { NFT } from '$lib/shared/types/NFT';


export const badgeMigrationStore = writable<BadgeMigration>({
  id: '',
  s1Badge: {} as NFT,
  isStarted: false,
  isCompleted: false,
  pinkTampers: 0,
  purpleTampers: 0,
  claimExpirationTimeout: new Date(),
  tamperExpirationTimeout: undefined,
  isApproved: false,
});

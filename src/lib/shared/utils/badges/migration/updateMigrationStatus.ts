import type { Address } from 'viem';

import { badgeMigrationStore } from '$shared/stores/badgeMigration';

import getMigrationStatus from './getMigrationStatus';

export default async function updateMigrationStatus(address: Address) {
  const { isCompleted, isStarted, s1BadgeId, pinkTampers, purpleTampers, claimExpiration, tamperExpiration } =
    await getMigrationStatus(address);

  badgeMigrationStore.set({
    isCompleted,
    isStarted,
    s1BadgeId,
    pinkTampers,
    purpleTampers,
    claimExpiration,
    tamperExpiration,
  });
}

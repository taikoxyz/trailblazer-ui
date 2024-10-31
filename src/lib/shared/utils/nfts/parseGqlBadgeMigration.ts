import { trailblazersBadgesAddress } from '$generated/abi';
import type { BadgeMigration as GqlBadgeMigration } from '$generated/graphql';
import { type Movements, Seasons } from '$lib/domains/profile/types/types';
import { type ActiveBadgeMigration, MigrationStatus } from '$shared/types/BadgeMigration';
import type { NFT } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';

import generateBadgeMetadata from './generateBadgeMetadata';

export default function parseGqlBadgeMigration(raw: GqlBadgeMigration): ActiveBadgeMigration {
  const s1BadgeId = parseInt(raw.s1Badge.badgeId.toString());
  const s1Badge = {
    tokenId: parseInt(raw.s1Badge.tokenId.toString()),
    address: trailblazersBadgesAddress[chainId],
    metadata: generateBadgeMetadata(Seasons.Season1, s1BadgeId),
    tokenUri: raw.s1Badge.uri || '',
  } satisfies NFT;

  let s2Badge = undefined;
  if (raw.s2Badge) {
    const badgeId = parseInt(raw.s2Badge.badgeId.toString());
    const movement = parseInt(raw.s2Badge.movement) as Movements;

    s2Badge = {
      tokenId: parseInt(raw.s2Badge.tokenId.toString()),
      address: trailblazersBadgesAddress[chainId],
      metadata: generateBadgeMetadata(Seasons.Season2, badgeId, movement),
      tokenUri: raw.s2Badge.uri || '',
    } satisfies NFT;
  }
  const tamperExpirationTimeoutRaw = parseInt(raw.tamperExpirationTimeout.toString());

  const tamperExpirationTimeout =
    tamperExpirationTimeoutRaw > 0 ? new Date(tamperExpirationTimeoutRaw * 1000) : undefined;

  const claimExpirationTimeout = new Date(parseInt(raw.claimExpirationTimeout.toString()) * 1000);

  let status = MigrationStatus.NOT_STARTED;
  if (raw.isCompleted) {
    status = MigrationStatus.COMPLETED;
  } else if (claimExpirationTimeout < new Date()) {
    status = MigrationStatus.CAN_CLAIM;
  } else if (claimExpirationTimeout >= new Date() && tamperExpirationTimeout && tamperExpirationTimeout < new Date()) {
    status = MigrationStatus.CAN_REFINE;
  } else if (tamperExpirationTimeout) {
    status = MigrationStatus.STARTED;
  } else if (parseInt(raw.claimExpirationTimeout.toString()) > 0) {
    status = MigrationStatus.STARTED;
  }

  return {
    badgeId: s1BadgeId,
    status,
    id: raw.id,
    s1Badge,
    s2Badge,
    whaleTampers: parseInt(raw.whaleTampers),
    minnowTampers: parseInt(raw.minnowTampers),
    claimExpirationTimeout,
    tamperExpirationTimeout,
  } satisfies ActiveBadgeMigration;
}

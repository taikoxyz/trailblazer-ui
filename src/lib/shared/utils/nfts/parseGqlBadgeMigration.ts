import { trailblazersBadgesAddress } from '$generated/abi';
import type { BadgeMigration as GqlBadgeMigration } from '$generated/graphql';
import { type Movements, Seasons } from '$lib/domains/profile/types/types';
import type { BadgeMigration } from '$shared/types/BadgeMigration';
import type { NFT } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';

import generateBadgeMetadata from './generateBadgeMetadata';

export default async function parseGqlBadgeMigration(
  raw: GqlBadgeMigration,
  approvedTokenIds: number[],
): Promise<BadgeMigration> {
  const s1badgeId = parseInt(raw.s1Badge.badgeId.toString());
  const s1Badge = {
    tokenId: parseInt(raw.s1Badge.tokenId.toString()),
    address: trailblazersBadgesAddress[chainId],
    metadata: generateBadgeMetadata(Seasons.Season1, s1badgeId),
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
  const tamperExpirationTimeout = parseInt(raw.tamperExpirationTimeout.toString());
  const minuteBuffer = 60 * 1000;
  return {
    id: raw.id,
    s1Badge,
    s2Badge,
    isStarted: Boolean(raw.isStarted),
    isCompleted: Boolean(raw.isCompleted),
    devTampers: parseInt(raw.devTampers),
    whaleTampers: parseInt(raw.whaleTampers),
    minnowTampers: parseInt(raw.minnowTampers),
    claimExpirationTimeout: new Date(minuteBuffer + parseInt(raw.claimExpirationTimeout.toString()) * 1000),
    tamperExpirationTimeout:
      tamperExpirationTimeout > 0 ? new Date(minuteBuffer + tamperExpirationTimeout * 1000) : undefined,
    isApproved: s1Badge ? approvedTokenIds.includes(parseInt(raw.s1Badge?.badgeId.toString())) : false,
  } satisfies BadgeMigration;
}

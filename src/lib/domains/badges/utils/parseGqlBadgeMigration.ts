import { trailblazersBadgesAddress } from '$generated/abi';
import type { BadgeMigration as GqlBadgeMigration } from '$generated/graphql';
import type { Movements } from '$lib/domains/profile/types/types';
import type { BadgeMigration } from '$shared/types/BadgeMigration';
import type { NFT } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';
import getBadgeURI from '$shared/utils/nfts/getBadgeURI';

export default async function parseGqlBadgeMigration(
  raw: GqlBadgeMigration,
  approvedTokenIds: number[],
): Promise<BadgeMigration> {
  const s1badgeId = parseInt(raw.s1Badge.badgeId.toString());
  const uri = getBadgeURI(s1badgeId);
  const s1Badge = {
    tokenId: parseInt(raw.s1Badge.tokenId.toString()),
    address: trailblazersBadgesAddress[chainId],
    metadata: {
      badgeId: s1badgeId,
      image: `${uri}.png`,
      'video/mp4': `${uri}.mp4`,
      'video/webm': `${uri}.webm`,
    },
    tokenUri: '',
  } satisfies NFT;

  let s2Badge = undefined;
  if (raw.s2Badge) {
    const badgeId = parseInt(raw.s2Badge.badgeId.toString());
    const movement = parseInt(raw.s2Badge.movement) as Movements;
    const uri = getBadgeURI(s1badgeId);

    s2Badge = {
      tokenId: parseInt(raw.s2Badge.tokenId.toString()),
      address: trailblazersBadgesAddress[chainId],
      metadata: {
        movement,
        badgeId,
        image: `${uri}.png`,
        'video/mp4': `${uri}.mp4`,
        'video/webm': `${uri}.webm`,
      },
      tokenUri: '',
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

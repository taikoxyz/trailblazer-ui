import { trailblazersBadgesAddress } from '$generated/abi';
import type { BadgeRecruitment as GqlBadgeRecruitment } from '$generated/graphql/badges';
import { type Movements, Seasons } from '$lib/domains/profile/types/types';
import { type IBadgeRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
import type { NFT } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';

import generateBadgeMetadata from './generateBadgeMetadata';

export default function parseGqlBadgeRecruitment(raw: GqlBadgeRecruitment): IBadgeRecruitment {
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
  const influenceExpirationTimeoutRaw = parseInt(raw.influenceExpirationTimeout.toString());

  const influenceExpirationTimeout =
    influenceExpirationTimeoutRaw > 0 ? new Date(influenceExpirationTimeoutRaw * 1000) : undefined;

  const claimExpirationTimeout = new Date(parseInt(raw.claimExpirationTimeout.toString()) * 1000);

  let status = RecruitmentStatus.NOT_STARTED;
  if (raw.isCompleted) {
    status = RecruitmentStatus.COMPLETED;
  } else if (claimExpirationTimeout < new Date()) {
    status = RecruitmentStatus.CAN_CLAIM;
  } else if (
    claimExpirationTimeout >= new Date() &&
    influenceExpirationTimeout &&
    influenceExpirationTimeout < new Date()
  ) {
    status = RecruitmentStatus.CAN_REFINE;
  } else if (influenceExpirationTimeout) {
    status = RecruitmentStatus.STARTED;
  } else if (parseInt(raw.claimExpirationTimeout.toString()) > 0) {
    status = RecruitmentStatus.STARTED;
  }

  return {
    cycleId: Number(raw.cycleId),
    badgeId: s1BadgeId,
    status,
    id: raw.id,
    s1Badge,
    s2Badge,
    whaleInfluences: parseInt(raw.whaleInfluences),
    minnowInfluences: parseInt(raw.minnowInfluences),
    claimExpirationTimeout,
    influenceExpirationTimeout,
  } satisfies IBadgeRecruitment;
}

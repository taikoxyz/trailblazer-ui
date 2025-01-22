import { trailblazersBadgesAddress } from '$generated/abi';
import type { BadgeRecruitment as GqlBadgeRecruitment } from '$generated/graphql/badges';
import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
import { getFactionName } from '$lib/domains/nfts/types/badges/types';
import type { Movements } from '$lib/domains/profile/types/types';
import { type IBadgeRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
import type { TBBadge } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';

export default async function parseGqlBadgeRecruitment(raw: GqlBadgeRecruitment): Promise<IBadgeRecruitment> {
  const s1BadgeId = parseInt(raw.s1Badge.badgeId.toString());
  const movement = parseInt(raw.s1Badge.movement) as Movements;
  const faction = getFactionName(s1BadgeId);
  const metadata = await nftService.getBadgeNFTMetadata(s1BadgeId, movement);
  let s1Badge: TBBadge;
  let s2Badge;

  if (metadata) {
    s1Badge = {
      tokenId: parseInt(raw.s1Badge.tokenId.toString()),
      address: trailblazersBadgesAddress[chainId],
      badgeId: s1BadgeId,
      movement,
      faction,
      metadata: metadata,
      tokenUri: raw.s1Badge.uri || '',
    } satisfies TBBadge;
  } else {
    throw new Error('Metadata not found');
  }
  if (raw.s2Badge) {
    const badgeId = parseInt(raw.s2Badge.badgeId.toString());
    const movement = parseInt(raw.s2Badge.movement) as Movements;
    const faction = getFactionName(badgeId);
    const metadata = await nftService.getBadgeNFTMetadata(badgeId, movement);
    if (metadata) {
      s2Badge = {
        tokenId: parseInt(raw.s2Badge.tokenId.toString()),
        badgeId: badgeId,
        movement,
        faction,
        address: trailblazersBadgesAddress[chainId],
        metadata: metadata,
        tokenUri: raw.s2Badge.uri || '',
      } satisfies TBBadge;
    }
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

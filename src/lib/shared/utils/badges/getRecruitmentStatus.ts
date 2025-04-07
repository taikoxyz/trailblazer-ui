import { get } from 'svelte/store';

import { activeRecruitmentStore, currentCycleStore } from '$shared/stores/recruitment';
import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';

import { getLogger } from '../logger';

const log = getLogger('getRecruitmentStatus');

export const getRecruitmentStatus = async (
  recruitment: ActiveRecruitment,
  cycle: number,
): Promise<RecruitmentStatus> => {
  log('getRecruitmentStatus for', { recruitment });

  const { claim, influence } = recruitment.cooldowns;
  const { recruitedBadge } = recruitment;

  const claimCooldown = claim.getTime();
  const influenceCooldown = influence.getTime();
  const now = new Date().getTime();

  log('Cooldowns', { claimCooldown, influenceCooldown, now });

  log('influenceCooldown > now', influenceCooldown > now, influenceCooldown, now);

  log('claimCooldown > now', claimCooldown > now, claimCooldown, now);

  if (
    ((claimCooldown === 0 || now > claimCooldown) &&
      recruitedBadge &&
      recruitedBadge.tokenId > 0n &&
      recruitment.cycle === get(currentCycleStore)) ||
    recruitment.badge.tokenId === -1
  ) {
    log('Recruitment is completed', recruitment);
    recruitment.status = RecruitmentStatus.COMPLETED;
    return RecruitmentStatus.COMPLETED;
  }

  if (Number(recruitment.cycle) !== cycle && !recruitment.recruitedBadge) {
    log('Recruitment is unfinished', recruitment, cycle, recruitment.cycle);

    recruitment.status = RecruitmentStatus.UNFINISHED;
    return RecruitmentStatus.UNFINISHED;
  }

  if (now > claimCooldown && claimCooldown > 0) {
    log('Recruitment can be claimed', { now, claimCooldown });

    recruitment.status = RecruitmentStatus.CAN_CLAIM;
    return RecruitmentStatus.CAN_CLAIM;
  }

  if (influenceCooldown < now) {
    log('Recruitment can be refined');
    recruitment.status = RecruitmentStatus.CAN_REFINE;
    return RecruitmentStatus.CAN_REFINE;
  }

  if (now < claimCooldown && claimCooldown > 0) {
    log('Recruitment started', recruitment, { now, claimCooldown });
    recruitment.status = RecruitmentStatus.STARTED;
    return RecruitmentStatus.STARTED;
  }

  if (
    get(activeRecruitmentStore) &&
    get(activeRecruitmentStore)?.find(
      (rec) => rec.badge.badgeId === recruitment.badge.badgeId && rec.cycle === recruitment.cycle,
    )
  ) {
    log('Recruitment is locked');
    recruitment.status = RecruitmentStatus.LOCKED;
    return RecruitmentStatus.LOCKED;
  }

  recruitment.status = RecruitmentStatus.NOT_STARTED;
  log('Recruitment has not started');
  return RecruitmentStatus.NOT_STARTED;
};

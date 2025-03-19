import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';

import { getLogger } from '../logger';

const log = getLogger('getRecruitmentStatus');

export const getRecruitmentStatus = (recruitment: ActiveRecruitment, cycle: number): RecruitmentStatus => {
  log('getRecruitmentStatus for', { recruitment });

  const { claim, influence } = recruitment.cooldowns;
  const { recruitedBadge } = recruitment;

  const claimCooldown = claim.getTime();
  const influenceCooldown = influence.getTime();
  const now = new Date().getTime();

  log('Cooldowns', { claimCooldown, influenceCooldown, now });

  log('influenceCooldown > now', influenceCooldown > now);

  if (
    (claimCooldown > 0 && now > claimCooldown && recruitedBadge && recruitedBadge.tokenId > 0n) ||
    recruitment.badge.tokenId === -1
  ) {
    log('Recruitment is completed', recruitment);
    return RecruitmentStatus.COMPLETED;
  }

  if (Number(recruitment.cycle) !== cycle) {
    log('Recruitment is unfinished', recruitment, cycle, recruitment.cycle);
    return RecruitmentStatus.UNFINISHED;
  }

  if (now > claimCooldown) {
    log('Recruitment can be claimed', { now, claimCooldown });
    return RecruitmentStatus.CAN_CLAIM;
  }

  if (influenceCooldown < now) {
    log('Recruitment can be refined');
    return RecruitmentStatus.CAN_REFINE;
  }

  if (now < claimCooldown) {
    log('Recruitment started', recruitment, { now, claimCooldown });
    return RecruitmentStatus.STARTED;
  }

  log('Recruitment has not started');
  return RecruitmentStatus.NOT_STARTED;
};

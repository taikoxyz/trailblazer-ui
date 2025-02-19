import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';

import { getLogger } from '../logger';

const log = getLogger('getRecruitmentStatus');

export const getRecruitmentStatus = (recruitment: ActiveRecruitment, cycle: number): RecruitmentStatus => {
  log('getRecruitmentStatus for', { recruitment });

  const { claim, influence } = recruitment.cooldowns;
  const { recruitedBadge } = recruitment;

  const claimCooldown = claim.getTime(); // FIX: Use getTime() instead of incorrect Number conversion
  const influenceCooldown = influence.getTime(); // FIX: Use getTime()
  const now = new Date().getTime();

  if ((now > claimCooldown && recruitedBadge && recruitedBadge.tokenId > 0n) || recruitment.badge.tokenId === -1) {
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

// ELIGIBLE = 'ELIGIBLE',
// NOT_STARTED = 'NOT_STARTED',
// STARTED = 'STARTED',
// CAN_REFINE = 'CAN_REFINE',
// CAN_CLAIM = 'CAN_CLAIM',
// COMPLETED = 'COMPLETED',
// LOCKED = 'LOCKED',
1739918040000000;
1739953090537;

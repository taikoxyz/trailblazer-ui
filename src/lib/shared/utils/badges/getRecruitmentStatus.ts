import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';

import { getLogger } from '../logger';

const log = getLogger('getRecruitmentStatus');

export const getRecruitmentStatus = (recruitment: ActiveRecruitment, cycle: number): RecruitmentStatus => {
  log('getRecruitmentStatus for', { recruitment });

  const { claim, influence } = recruitment.cooldowns;
  const { recruitedBadge } = recruitment;

  const claimCooldown = Number(claim) * 1000;
  const influenceCooldown = Number(influence) * 1000;

  const now = new Date().getTime();

  if (now > claimCooldown && recruitedBadge && recruitedBadge.tokenId > 0n) {
    log('Recruitment is completed');
    return RecruitmentStatus.COMPLETED;
  }

  if (Number(recruitment.cycle) !== cycle) {
    log('Recruitment is unfinished');
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
    log('Recruitment can be claimed');
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

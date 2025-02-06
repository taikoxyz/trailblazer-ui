import { type IBadgeRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';

import { getLogger } from '../logger';

const log = getLogger('getRecruitmentStatus');

export const getRecruitmentStatus = (recruitment: IBadgeRecruitment): RecruitmentStatus => {
  log('getRecruitmentStatus for', { recruitment });

  const { cooldownExpiration, influenceExpiration, s2TokenId } = recruitment;

  const cooldown = Number(cooldownExpiration) * 1000;

  const now = new Date().getTime();

  if (now > cooldown && s2TokenId > 0n) {
    log('Recruitment is completed');
    return RecruitmentStatus.COMPLETED;
  }

  if (now > cooldown) {
    log('Recruitment can be claimed', { now, cooldown });
    return RecruitmentStatus.CAN_CLAIM;
  }

  if (influenceExpiration < now) {
    log('Recruitment can be refined');
    return RecruitmentStatus.CAN_REFINE;
  }

  if (now < cooldown) {
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

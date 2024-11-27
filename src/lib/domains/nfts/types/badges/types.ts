import { PUBLIC_MAX_BADGE_ID } from '$env/static/public';
import type { IBadgeRecruitment } from '$lib/shared/types/BadgeRecruitment';

export const maxBadgeId = parseInt(PUBLIC_MAX_BADGE_ID, 10);

export enum FactionNames {
  Ravers = 'Ravers',
  Robots = 'Robots',
  Bouncers = 'Bouncers',
  Masters = 'Masters',
  Monks = 'Monks',
  Androids = 'Androids',
  Drummers = 'Drummers',
  Shinto = 'Shinto',
}

// return type for getRecruitmentStatus
export interface GetRecruitmentStatusResult {
  approvedTokenIds: number[];
  recruitments: IBadgeRecruitment[];
}

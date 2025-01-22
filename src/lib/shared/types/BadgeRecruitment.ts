import type { TBBadge } from '$lib/shared/types/NFT';

export enum RecruitmentStatus {
  ELIGIBLE = 'ELIGIBLE',
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  CAN_REFINE = 'CAN_REFINE',
  CAN_CLAIM = 'CAN_CLAIM',
  COMPLETED = 'COMPLETED',
  LOCKED = 'LOCKED',
}

export interface IBadgeRecruitment {
  cycleId: number;
  id: string;
  badgeId: number;
  status: RecruitmentStatus;
  s1Badge: TBBadge;
  s2Badge?: TBBadge;
  whaleInfluences: number;
  minnowInfluences: number;
  claimExpirationTimeout: Date;
  influenceExpirationTimeout?: Date;
}

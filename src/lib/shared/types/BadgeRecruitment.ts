import type { NFT } from './NFT';

export enum RecruitmentStatus {
  ELIGIBLE = 'ELIGIBLE',
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  CAN_REFINE = 'CAN_REFINE',
  CAN_CLAIM = 'CAN_CLAIM',
  COMPLETED = 'COMPLETED',
}

export interface IBadgeRecruitment {
  id: string;
  badgeId: number;
  status: RecruitmentStatus;
  s1Badge: NFT;
  s2Badge?: NFT;
  whaleInfluences: number;
  minnowInfluences: number;
  claimExpirationTimeout: Date;
  influenceExpirationTimeout?: Date;
}

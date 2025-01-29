import type { TBBadge } from '$lib/shared/types/NFT';
import type { Address } from 'viem';

export enum RecruitmentStatus {
  ELIGIBLE = 'ELIGIBLE',
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  CAN_REFINE = 'CAN_REFINE',
  CAN_CLAIM = 'CAN_CLAIM',
  COMPLETED = 'COMPLETED',
  LOCKED = 'LOCKED',
  ALREADY_RECRUITED = 'ALREADY_RECRUITED',
}

// export interface IBadgeRecruitment {
//   cycleId: number;
//   id: string;
//   badgeId: number;
//   status?: RecruitmentStatus;
//   // s1Badge: TBBadge;
//   // s2Badge?: TBBadge;
//   whaleInfluences: number;
//   minnowInfluences: number;
//   claimExpirationTimeout: Date;
//   influenceExpirationTimeout?: Date;
// }

// struct Recruitment {
//     uint256 recruitmentCycle;
//     address user;
//     uint256 s1BadgeId;
//     uint256 s1TokenId;
//     uint256 s2TokenId;
//     uint256 cooldownExpiration;
//     uint256 influenceExpiration;
//     uint256 whaleInfluences;
//     uint256 minnowInfluences;
// }

export interface IBadgeRecruitment {
  recruitmentCycle: bigint;
  user: Address;
  s1BadgeId: bigint;
  s1TokenId: bigint;
  s2TokenId: bigint;
  cooldownExpiration: bigint;
  influenceExpiration: bigint;
  whaleInfluences: bigint;
  minnowInfluences: bigint;
}

export interface ActiveRecruitment {
  whaleInfluences: number;
  minnowInfluences: number;
  status: RecruitmentStatus;
  badge: TBBadge;
  recruitedBadge?: TBBadge;
}

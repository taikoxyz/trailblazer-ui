import type { Address } from 'viem';

import type { TBBadge } from '$lib/shared/types/NFT';

export enum RecruitmentStatus {
  ELIGIBLE = 'ELIGIBLE',
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  REFINING = 'REFINING',
  CAN_REFINE = 'CAN_REFINE',
  CAN_CLAIM = 'CAN_CLAIM',
  COMPLETED = 'COMPLETED',
  LOCKED = 'LOCKED',
  ALREADY_RECRUITED = 'ALREADY_RECRUITED',
  UNFINISHED = 'UNFINISHED',
}

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
  cycle: number;
  status: RecruitmentStatus;
  badge: TBBadge;
  recruitedBadge?: TBBadge;
  influences: {
    whale: number;
    minnow: number;
  };
  cooldowns: {
    claim: Date;
    influence: Date;
  };
}

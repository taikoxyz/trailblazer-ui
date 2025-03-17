import type { GetLogsReturnType } from 'viem';

export const recruitmentUpdatedEvent = {
  type: 'event',
  inputs: [
    { name: 'recruitmentCycle', internalType: 'uint256', type: 'uint256', indexed: true },
    { name: 'user', internalType: 'address', type: 'address', indexed: true },
    { name: 's1BadgeId', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 's1TokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 's2TokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 'cooldownExpiration', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 'influenceExpiration', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 'whaleInfluences', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 'minnowInfluences', internalType: 'uint256', type: 'uint256', indexed: false },
  ],
  name: 'RecruitmentUpdated',
} as const;

export interface RecruitmentUpdatedLog extends GetLogsReturnType<typeof recruitmentUpdatedEvent> {}

export const recruitmentCompleteEvent = {
  type: 'event',
  inputs: [
    { name: 'recruitmentCycle', internalType: 'uint256', type: 'uint256', indexed: true },
    { name: 'user', internalType: 'address', type: 'address', indexed: true },
    { name: 's1TokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 's2TokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    { name: 'finalColor', internalType: 'uint256', type: 'uint256', indexed: false },
  ],
  name: 'RecruitmentComplete',
} as const;

export interface RecruitmentCompleteLog extends GetLogsReturnType<typeof recruitmentCompleteEvent> {}

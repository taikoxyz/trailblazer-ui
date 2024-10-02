import { zeroAddress } from 'viem';

import type { UserProfile } from './UserProfile';

export const defaultUserProfile: UserProfile = {
  address: zeroAddress,
  personalInfo: {
    name: undefined,
    ens: undefined,
    avatar: undefined,
  },
  userStats: {
    score: 0,
    rank: '0',
    title: '',
    level: '',
    total: '0',
    rankPercentile: undefined,
  },
  activityHistory: {},
  multipliers: {
    totalMultiplier: 0,
    taikoonMultiplier: 0,
    factionMultiplier: 0,
    snaefellMultiplier: 0,
  },
  domainInfo: {},
};

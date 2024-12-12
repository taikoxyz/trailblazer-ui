import { zeroAddress } from 'viem';

import { DomainType } from '$lib/domains/profile/types/types';
import type { UserProfile } from '$lib/domains/profile/types/UserProfile';

export const MOCK_PROFILE: UserProfile = {
  address: zeroAddress,
  personalInfo: {
    name: 'Jane',
    ens: 'jane.eth',
    avatar: '/avatar.png',
  },
  userStats: {
    score: 12345,
    rank: '1',
    title: 'Legend',
    level: '12',
    total: '9999',
    rankPercentile: '99',
  },
  activityHistory: {},
  multipliers: {
    transationMultiplier: {
      multiplier: 1,
      max: false,
    },
    transactionVolumeMultiplier: {
      multiplier: 1,
      max: false,
    },
    globalMultiplier: {
      multiplier: 1,
      max: false,
    },
  },
  domainInfo: {
    dotTaiko: 'jane.test.taiko',
    selected: DomainType.DOTTAIKO,
  },
  nfts: [],
};

export const MOCK_PROFILE_2: UserProfile = {
  address: zeroAddress,
  personalInfo: {
    name: 'John',
    ens: 'john.eth',
    avatar: '/avatar.png',
  },
  userStats: {
    score: 54321,
    rank: '99',
    title: 'Beginner',
    level: '0',
    total: '9999',
    rankPercentile: '20',
  },
  activityHistory: {},
  multipliers: {
    transationMultiplier: {
      multiplier: 1,
      max: false,
    },
    transactionVolumeMultiplier: {
      multiplier: 1,
      max: false,
    },
    globalMultiplier: {
      multiplier: 1,
      max: false,
    },
  },
  domainInfo: {
    selected: DomainType.ADDRESS,
  },
  nfts: [],
};

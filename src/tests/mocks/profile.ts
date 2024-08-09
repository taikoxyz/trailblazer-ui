import { zeroAddress } from 'viem';

import type { UserProfile } from '$libs/profile';

export const MOCK_PROFILE: UserProfile = {
  avatar: '/avatar.png',
  name: 'Jane',
  address: zeroAddress,
  ens: 'jane.eth',
  score: 0,
  title: 'Beginner',
  level: 0,
  experience: 10000,
  rankPercentile: '99',
  isLoading: true,
  faction: {
    faction: 'Drummers',
    boostedOrBased: 'Boosted',
  },
  leaderboardPosition: '1',
  pointsToNextLevel: 1000,
  total: '0',
  rank: '0',
  movement: 0,
  multipliers: {
    factionMultiplier: 2,
    snaefellMultiplier: 2,
    taikoonMultiplier: 2,
    totalMultiplier: 3,
  },
  nfts: [],
  boostedPoints: 0,
};

export const MOCK_PROFILE_2: UserProfile = {
  avatar: '/avatar.png',
  name: 'Jane',
  address: zeroAddress,
  ens: 'jane2.eth',
  score: 0,
  title: 'Beginner',
  level: 0,
  experience: 10000,
  rankPercentile: '99',
  isLoading: false,
  faction: {
    faction: 'Drummers',
    boostedOrBased: 'Boosted',
  },
  leaderboardPosition: '1',
  pointsToNextLevel: 1000,
  total: '0',
  rank: '0',
  movement: 1,
  multipliers: {
    factionMultiplier: 1,
    snaefellMultiplier: 1,
    taikoonMultiplier: 1,
    totalMultiplier: 1,
  },
  nfts: [],
  boostedPoints: 0,
};

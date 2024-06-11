import { zeroAddress } from 'viem';

import Placeholder from '$images/avatar.png';
import type { UserProfile } from '$libs/profile';

export const MOCK_PROFILE: UserProfile = {
  avatar: Placeholder,
  name: 'Jane',
  address: zeroAddress,
  ens: 'jane.eth',
  score: 0,
  title: 'Beginner',
  level: '0',
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
};

export const MOCK_PROFILE_2: UserProfile = {
  avatar: Placeholder,
  name: 'Jane',
  address: zeroAddress,
  ens: 'jane2.eth',
  score: 0,
  title: 'Beginner',
  level: '0',
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
};

import Placeholder from '$images/avatar.png';
import type { UserProfile } from '$libs/profile';

export const MOCK_PROFILE: UserProfile = {
  avatar: Placeholder,
  name: 'Jane',
  address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
  ens: 'jane.eth',
  points: 0,
  rank: 'Drummer Level 5',
  experience: 10000,
  rankPercentile: '99',
  isLoading: true,
  faction: {
    faction: 'Drummers',
    boostedOrBased: 'Boosted',
  },
  leaderboardPosition: '1',
  pointsToNextLevel: 1000,
};

export const MOCK_PROFILE_2: UserProfile = {
  avatar: Placeholder,
  name: 'Jane',
  address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
  ens: 'jane2.eth',
  points: 0,
  rank: 'Drummer Level 4',
  experience: 10000,
  rankPercentile: '99',
  isLoading: false,
  faction: {
    faction: 'Drummers',
    boostedOrBased: 'Boosted',
  },
  leaderboardPosition: '1',
  pointsToNextLevel: 1000,
};

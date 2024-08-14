import type { UserPointHistory } from '$libs/profile';

// Deprecated
export const MOCK_USER_POINT_HISTORY: UserPointHistory[] = [
  {
    address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
    event: 'Transaction',
    points: 10,
    date: 0,
    multiplier: 1,
  },
  {
    address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
    event: 'Transaction',
    points: 100,
    date: 0,
    multiplier: 1,
  },
  {
    address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
    event: 'Transaction',
    points: 4000,
    date: 0,
    multiplier: 4,
  },
];

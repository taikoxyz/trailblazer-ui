import type { UserPointHistory } from '$libs/profile';

export const MOCK_USER_POINT_HISTORY: UserPointHistory[] = [
  {
    address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
    event: 'ETHBridged',
    points: 10,
    date: new Date('2024-01-01').toLocaleString(),
  },
  {
    address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
    event: 'ETHBridged',
    points: 100,
    date: new Date('2024-01-01').toLocaleString(),
  },
  {
    address: '0x424bFb32f78731252a6BCeDc828E38e2701DAAEd',
    event: 'ETHBridged',
    points: 1000,
    date: new Date('2024-01-01').toLocaleString(),
  },
];

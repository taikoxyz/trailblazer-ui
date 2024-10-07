import type { PaginationInfo } from '$lib/domains/leaderboard/types/shared/types';
import type { Address } from 'viem';

export type ActivityHistory = {
  activityHistory: {
    items?: UserPointHistory[];
    pagination: PaginationInfo;
  };
};

// export type ProfileTransactionPage = {
//   items: UserPointHistory[];
//   lastUpdated: number;
//   pagination: PaginationInfo;
// };

export type UserPointHistory = {
  address: Address;
  event: string;
  points: number;
  date: number;
  multiplier: number;
};

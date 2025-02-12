import type { Address } from 'viem';

import type { PaginationInfo } from '$lib/domains/leaderboard/types/shared/types';

export type ActivityHistory = {
  activityHistory: {
    items?: UserPointHistory[];
    pagination?: PaginationInfo;
  };
};

// export type ProfileTransactionPage = {
//   items: UserPointHistory[];
//   lastUpdated: number;
//   pagination: PaginationInfo;
// };

export type UserPointHistory = {
  address: Address;
  event: ActivityType;
  points: number;
  date: number;
  multiplier: number;
  tx_hash?: string;
};

export enum ActivityType {
  PREDICTION = 'Prediction',
  TRANSACTION_VALUE = 'TransactionValue',
  TRANSACTION = 'Transaction',
  BRIDGED = 'Bridged',
  BLOCK_PROPOSED = 'BlockProposed',
  BLOCK_PROVEN = 'BlockProven',
  DORAHACKS_VOTE = 'DoraHacksVoting',
  AVALON_CLAIN = 'AvalonClaim',
}

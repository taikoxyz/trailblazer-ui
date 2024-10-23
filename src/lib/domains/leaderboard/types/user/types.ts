import type { Address } from 'viem';

import type { PaginationInfo, UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

export type UserLeaderboardItem = {
  address: Address;
  score: number;
  rank: number;
};

export type UserLeaderboardRow = UserLeaderboardItem & {
  level?: string;
  title?: string;
  name?: string;
  icon?: string;
};

export type UserLeaderboardPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

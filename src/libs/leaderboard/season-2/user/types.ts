import type { Address } from 'viem';

import type { CommonPageApiResponse } from '$libs/leaderboard/types';

export type UserLeaderboardPageApiResponse = {
  lastUpdated: number;
  data: CommonPageApiResponse<UserLeaderboardItem>;
};

export type UserLeaderboardPage = {
  items: UserLeaderboardRow[];
  totalUsers: number;
  pageNumber: number;
  lastUpdated: number;
};

export type UserLeaderboardItem = {
  address: Address;
  score: number;
};

export type UserLeaderboardRow = UserLeaderboardItem & {
  position?: number;
  level?: string;
  title?: string;
  name?: string;
};

import type { Address } from 'viem';

import type { PaginationInfo, UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

export type DappLeaderboardPage = {
  items: DappLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

export type DappLeaderboardRow = {
  address: string;
  rank: number;
  data: ProtocolData[];
  metadata?: ProtocolMetadata;
  totalScore: number;
};

export type GamingLeaderboardRow = DappLeaderboardRow;

export type UserLeaderboardPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

export type GamingLeaderboardPage = DappLeaderboardPage;

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

// Internal types

type ProtocolData = {
  address: Address;
  score: number;
};

export type ProtocolMetadata = {
  name: string;
  slug: string;
  twitter: string;
  logo: string;
};

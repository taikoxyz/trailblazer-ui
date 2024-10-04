import type { Address } from 'viem';

import type { UnifiedLeaderboardRow } from '$libs/leaderboard';

export type DappLeaderboardPage = {
  items: DappLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

export type DappLeaderboardRow = {
  address: string;
  data: ProtocolData[];
  metadata?: ProtocolMetadata;
  totalScore: number;
};

export type UserLeaderboardPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

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

type ProtocolMetadata = {
  name: string;
  slug: string;
  twitter: string;
  logo: string;
};

type PaginationInfo = {
  page: number;
  size: number;
  max_page?: number;
  total_pages?: number;
  total: number;
  last?: number;
  first?: number;
  visible?: number;
};

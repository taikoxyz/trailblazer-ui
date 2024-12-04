import type { Address } from 'viem';

import type { PaginationInfo, UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

export type DappLeaderboardPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

export type DappLeaderboardRow = {
  name: string;
  rank: number;
  data: ProtocolData[];
  metadata?: ProtocolMetadata;
  totalScore: number;
};

export type GamingLeaderboardRow = DappLeaderboardRow;

export type GamingLeaderboardPage = DappLeaderboardPage;

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

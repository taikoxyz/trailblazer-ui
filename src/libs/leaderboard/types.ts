import type { Address } from 'viem';

export type LeaderboardPage = {
  items: LeaderboardRow[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type LeaderboardRow = {
  address: string;
  score: number;
};

export type BridgedTokenData = { token: Address; score: number };

// Deprecated
export type GroupedData = {
  address: string;
  bridged: BridgedTokenData[];
  value: number;
};
export type BridgeData = BridgeLeaderboardRow & {
  twitter?: string;
  icon?: string;
};
export type BridgeLeaderboardRow = {
  name: string;
  volume: number;
  scores: BridgeTokenScore[];
};

export type BridgeLeaderboardPage = {
  bridgingEntries: BridgeLeaderboardRow[];
};

export type BridgeLeaderboardTotal = {
  items: BridgeData[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type BridgeTokenScore = {
  token: Address;
  score: number;
};

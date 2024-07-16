import type { Address } from 'viem';

export type DappLeaderboardPageApiResponse = {
  items: DappLeaderboardItem[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type UserLeaderboardPageApiResponse = {
  items: UserLeaderboardItem[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type DappLeaderboardPage = {
  items: LeaderboardRow[];
};

export type UserLeaderboardPage = {
  items: UserLeaderboardItem[];
};

export type DappLeaderboardItem = {
  address: Address;
  score: number;
  slug: string;
};

export type UserLeaderboardItem = {
  address: Address;
  score: number;
};

export type LeaderboardRow = {
  address: string;
  data: ProtocolData[];
  totalScore: number;
};

export type ProtocolApiResponse = {
  protocols: ProtocolData[];
};

export type ProtocolData = {
  address: Address;
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

export type PaginationInfo = {
  first?: boolean;
  last?: boolean;
  max_page?: number;
  total?: number;
  total_pages?: number;
  page: number;
  size: number;
};

export type BridgeTokenScore = {
  token: Address;
  score: number;
};

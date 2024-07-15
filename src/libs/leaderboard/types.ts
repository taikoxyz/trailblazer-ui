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

export type DefiDappLeaderboardPage = {
  protocols: DefiDappLeaderboardRow[];
  lastUpdated: number;
};

export type DefiDappLeaderboardRow = {
  id: string;
  name: string;
  address: string;
  symbol: string;
  url: string;
  description: string;
  chain: string;
  logo: string;
  audits: string;
  audit_note: string | null;
  gecko_id: string;
  cmcId: string;
  category: string;
  chains: string[];
  module: string;
  twitter: string;
  forkedFrom: string | null;
  oracles: string | null;
  listedAt: number;
  slug: string;
  tvl: number;
  chainTvls: {
    [key: string]: number;
  };
  taikoTvl?: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  tokenBreakdowns: Record<string, unknown>;
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

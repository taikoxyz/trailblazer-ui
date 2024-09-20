import type { Address } from 'viem';

export type DappLeaderboardPageApiResponse = {
  lastUpdated: number;
  data: CommonPageApiResponse<DappLeaderboardItem>;
};

export type DappLeaderboardItem = {
  address: Address;
  score: number;
  slug: string;
};

export type DappLeaderboardPage = {
  items: DappLeaderboardRow[];
  lastUpdated: number;
};

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

export type DappLeaderboardRow = {
  address: string;
  icon?: string;
  handle?: string;
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

export type TvlLeaderboardResponse = {
  lastUpdated: number;
  protocols: DefiDappLeaderboardRow[];
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

export type PaginationInfo<T> = {
  items?: T[];
  page: number;
  size: number;
  max_page?: number;
  total_pages?: number;
  total?: number;
  last?: number;
  first?: number;
  visible?: number;
  name?: string;
};

export type CommonPageApiResponse<T> = PaginationInfo<T>;

export type BridgeTokenScore = {
  token: Address;
  score: number;
};

export type UnifiedLeaderboardRow = {
  address: string;
  icon?: string;
  handle?: string;
  data: ProtocolData[];
  totalScore: number;
  level?: string;
  title?: string;
  name?: string;
};

export type DetailsMapping = {
  [slug: string]: {
    name?: string;
    icon?: string;
    handle?: string;
  };
};

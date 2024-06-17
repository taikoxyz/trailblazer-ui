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

export type BridgedTokenData = { token: string; score: number };

export type GroupedData = {
  address: string;
  bridged: BridgedTokenData[];
  value: number;
};
export type BridgeData = GroupedData & {
  name?: string;
  twitter?: string;
  icon?: string;
};

export type BridgeLeaderboardPage = {
  items: BridgeLeaderboardRow[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
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

export type BridgeLeaderboardRow = {
  address: string;
  token: string;
  score: number;
};

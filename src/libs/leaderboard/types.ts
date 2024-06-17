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
export type GroupedData = {
  address: string;
  bridged: { token: string; score: number }[];
  value: number;
};
export type BridgeLeaderboardPage = {
  items: GroupedData[];
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

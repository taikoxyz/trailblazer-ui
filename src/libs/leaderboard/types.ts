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

export type SeasonHistoryEntry = {
  score: number;
  multiplier: number;
  total: number;
  // rank: string;
  // title: string;
  // level: string;
  // total?: string;
  // rankPercentile?: string;
};

export type UserStatsDetails = {
  score: number;
  rank: string;
  title: string;
  level: string;
  total: string;
  rankPercentile?: string;
  seasonHistory?: Record<number, SeasonHistoryEntry>;
};

export type UserStats = {
  userStats: UserStatsDetails;
};

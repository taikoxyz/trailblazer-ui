import type { PaginationInfo, UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

export type CexCompetitionRow = {
  score: number;
  rank: number;
  icon?: string;
};

export type CexCompetitionPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

export type InfoBoxType = {
  title: string;
  icon: string;
  text: string;
};

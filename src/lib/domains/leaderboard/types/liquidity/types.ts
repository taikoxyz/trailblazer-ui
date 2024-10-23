import type { PaginationInfo, UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

import type { UserLeaderboardItem } from '../user/types';

export type LiquidityCompetitionRow = UserLeaderboardItem & {
  icon?: string;
};

export type LiquidityCompetitionPage = {
  items: UnifiedLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

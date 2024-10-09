import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/dapps/types';
import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

export type UserLeaderboardPageApiResponse = {
  lastUpdated: number;
  data: CommonPageApiResponse<UserLeaderboardItem>;
};

import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

import type { UserLeaderboardItem } from '../types/dapps/types';

export type UserLeaderboardPageApiResponse = {
  lastUpdated: number;
  data: CommonPageApiResponse<UserLeaderboardItem>;
};

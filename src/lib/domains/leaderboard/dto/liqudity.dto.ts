import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

export type LiquidityLeaderboardPageApiResponse = CommonPageApiResponse<UserLeaderboardItem>;

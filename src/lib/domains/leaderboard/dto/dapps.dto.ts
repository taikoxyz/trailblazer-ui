import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

export type DappLeaderboardPageApiResponse = CommonPageApiResponse<DappLeaderboardItem>;

export type DappLeaderboardItem = {
  name: string;
  score: number;
  slug: string;
  rank: number;
};

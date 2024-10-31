import type { Address } from 'viem';

import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

export type DappLeaderboardPageApiResponse = CommonPageApiResponse<DappLeaderboardItem>;

export type DappLeaderboardItem = {
  address: Address;
  score: number;
  slug: string;
  rank: number;
};

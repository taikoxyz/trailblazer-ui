import type { Address } from 'viem';

import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

export type DappLeaderboardPageApiResponse = {
  lastUpdated: number;
  data: CommonPageApiResponse<DappLeaderboardItem>;
};

export type DappLeaderboardItem = {
  address: Address;
  score: number;
  slug: string;
};

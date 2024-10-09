import type { Address } from 'viem';

import type { UserPointHistory } from '$lib/domains/profile/types/ActivityHistory';
import type { CommonPageApiResponse } from '$lib/shared/dto/CommonPageApiResponse';

export interface UserPointsAndRankResponse {
  rank: number;
  address: Address;
  score: number;
  multiplier: number;
  totalScore: number;
  total: number;
  blacklisted: boolean;
}

export interface UserSeasonBonusPointsResponse {
  address: Address;
  value: number;
}

export type DomainResponse = {
  zns: string;
  dotTaiko: string;
  address: string;
};

export type UserPointHistoryPage = {
  items: UserPointHistory[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type UserHistoryApiResponse = CommonPageApiResponse<UserPointHistory>;

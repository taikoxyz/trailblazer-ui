import type { Address } from 'viem';

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

export type UserPointHistory = {
  address: Address;
  event: string;
  points: number;
  date: number;
  multiplier: number;
};

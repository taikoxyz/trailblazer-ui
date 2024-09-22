import type { Address } from 'viem';

export interface UserPointsAndRank {
  rank: number;
  address: Address;
  score: number;
  multiplier: number;
  totalScore: number;
  total: number;
  blacklisted: boolean;
}

export interface UserSeasonBonusPoints {
  address: Address;
  value: number;
}

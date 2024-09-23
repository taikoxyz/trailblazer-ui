import type { Address } from 'viem';

export interface UserPointsAndRankResponse {
  data: {
    rank: number;
    address: Address;
    score: number;
    multiplier: number;
    totalScore: number;
    total: number;
    blacklisted: boolean;
  };
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

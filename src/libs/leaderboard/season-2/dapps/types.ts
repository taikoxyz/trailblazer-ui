import type { Address } from 'viem';

import type { CommonPageApiResponse } from '$libs/leaderboard/types';

export type DappLeaderboardPageApiResponse = {
  lastUpdated: number;
  data: CommonPageApiResponse<DappLeaderboardItem>;
};

export type DappLeaderboardItem = {
  address: string;
  score: number;
  slug: string;
};

export type DappLeaderboardRow = {
  address: string;
  icon?: string;
  handle?: string;
  data: ProtocolDetails[];
  totalScore: number;
};

export type ProtocolDetails = {
  contracts: ContractData[];
  metadata: DappMetadata;
};
export type DappMetadata = {
  url: string;
  description: string;
  logo: string;
  twitter: string;
};

export type ContractData = {
  address: Address;
  score: number;
};

export type DappLeaderboardPage = {
  items: DappLeaderboardRow[];
  lastUpdated: number;
};

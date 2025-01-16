import type { Address } from 'viem';

export type UnifiedLeaderboardRow = {
  name?: string;
  rank: number;
  data: ProtocolData[];
  score?: number;
  totalScore: number;
  icon?: string;
  handle?: string;
  level?: string;
  title?: string;
  address?: Address;
};

type ProtocolData = {
  address: Address;
  score: number;
};

export type PaginationInfo = {
  page: number;
  size: number;
  max_page?: number;
  total_pages?: number;
  total: number;
  last?: number;
  first?: number;
  visible?: number;
};

export type LoadLeaderboardDataType = (page: number, name?: string) => Promise<void>;

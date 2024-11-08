import type { Address } from 'viem';

export type UnifiedLeaderboardRow = {
  address: string;
  rank: number;
  icon?: string;
  handle?: string;
  data: ProtocolData[];
  totalScore: number;
  level?: string;
  title?: string;
  name?: string;
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

import type { Address } from 'viem';

export type DappLeaderboardPage = {
  items: DappLeaderboardRow[];
  lastUpdated: number;
  pagination: PaginationInfo;
};

export type DappLeaderboardRow = {
  address: string;
  data: ProtocolData[];
  metadata?: ProtocolMetadata;
  totalScore: number;
};

type ProtocolData = {
  address: Address;
  score: number;
};

type ProtocolMetadata = {
  name: string;
  slug: string;
  twitter: string;
  logo: string;
};

type PaginationInfo = {
  page: number;
  size: number;
  max_page?: number;
  total_pages?: number;
  total?: number;
  last?: number;
  first?: number;
  visible?: number;
};

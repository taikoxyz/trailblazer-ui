import type { Address } from 'viem';

export type UnifiedLeaderboardRow = {
  address: string;
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

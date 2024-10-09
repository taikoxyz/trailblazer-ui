import type { Address } from 'viem';

export type UserInfoForLeaderboard = {
  address: Address;
  score: number;
  rank: string;
  title: string;
  level: string;
  total: string;
  rankPercentile: string;
  profilePicture: string;
};

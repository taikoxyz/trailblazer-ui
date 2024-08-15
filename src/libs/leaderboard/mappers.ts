import type { UserLeaderboard } from '$components/Leaderboards';
import { Profile } from '$libs/profile';

import type { DappLeaderboardRow, DefiDappLeaderboardRow, UnifiedLeaderboardRow, UserLeaderboardRow } from './types';

export function mapDappLeaderboardRow(row: DappLeaderboardRow): UnifiedLeaderboardRow {
  return {
    address: row.address,
    icon: row.icon,
    handle: row.handle,
    data: row.data,
    totalScore: row.totalScore,
  };
}

export function mapDefiDappLeaderboardRow(row: DefiDappLeaderboardRow): UnifiedLeaderboardRow {
  const totalScore = row?.taikoTvl ? row.taikoTvl : 0;
  return {
    address: row.name ? row.name : row.address,
    icon: row.logo,
    handle: row.twitter,
    data: [],
    totalScore,
  };
}

export function mapUserLeaderboardRow(row: UserLeaderboardRow): UnifiedLeaderboardRow {
  const totalScore = row.score ? row.score : 0;
  const percentile = Profile.calculatePercentile();
  const level = Profile.getLevel();

  const rank;
  return {
    address: row.address ? row.address : row.address,
    icon: '',
    handle: '',
    data: [],
    totalScore,
  };
}

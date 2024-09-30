import { get } from 'svelte/store';

import { Profile } from '$libs/profile';
import { currentUserLeaderboard } from '$stores/leaderboard';

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
  if (!row.position) {
    throw new Error('');
  }
  const totalScore = row.score ? row.score : 0;
  const totalUsers = get(currentUserLeaderboard).totalUsers;
  const percentile = Profile.calculatePercentile(row.position, totalUsers);
  const level = Profile.getLevel(percentile);

  const out = {
    address: row.address ? row.address : row.address,
    level: level.level || '1',
    title: level.title || 'Drummer',
    icon: row.icon,
    handle: '',
    data: [],
    totalScore,
  };

  // const rank = 1;
  return out;
}

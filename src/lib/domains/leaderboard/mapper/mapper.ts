import type { DappLeaderboardRow, GamingLeaderboardRow } from '$lib/domains/leaderboard/types/dapps/types';
import type { DefiDappLeaderboardRow } from '$lib/domains/leaderboard/types/defi/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { UserLeaderboardRow } from '$lib/domains/leaderboard/types/user/types';

import type { LiquidityCompetitionRow } from '../types/liquidity/types';

export function mapDappLeaderboardRow(row: DappLeaderboardRow): UnifiedLeaderboardRow {
  return {
    address: row.address,
    icon: row.metadata?.logo,
    rank: row.rank,
    handle: row.metadata?.twitter,
    data: row.data,
    name: row.metadata?.name,
    totalScore: row.totalScore,
  };
}

export function mapGamingLeaderboardRow(row: GamingLeaderboardRow): UnifiedLeaderboardRow {
  return {
    address: row.address,
    icon: row.metadata?.logo,
    rank: row.rank,
    handle: row.metadata?.twitter,
    data: row.data,
    name: row.metadata?.name,
    totalScore: row.totalScore,
  };
}

export function mapUserLeaderboardRow(row: UserLeaderboardRow): UnifiedLeaderboardRow {
  if (!row.rank) {
    throw new Error('');
  }

  const out = {
    rank: row.rank,
    address: row.address ? row.address : row.address,
    level: row.level || '0',
    title: row.title || 'Beginner',
    icon: row.icon,
    handle: '',
    data: [],
    score: row.score,
    totalScore: row.totalScore!,
  };

  return out;
}

export function mapLiquidityLeaderboardRow(row: LiquidityCompetitionRow): UnifiedLeaderboardRow {
  if (!row.rank) {
    throw new Error('');
  }
  return {
    address: row.address,
    rank: row.rank,
    icon: row.icon,
    data: [],
    totalScore: row.score,
  };
}

export function mapDefiDappLeaderboardRow(row: DefiDappLeaderboardRow): UnifiedLeaderboardRow {
  const totalScore = row?.taikoTvl ? row.taikoTvl : 0;
  return {
    address: row.name ? row.name : row.address,
    rank: 0,
    icon: row.logo,
    handle: row.twitter,
    data: [],
    totalScore,
  };
}

import type {
  DappLeaderboardRow,
  GamingLeaderboardRow,
  UserLeaderboardRow,
} from '$lib/domains/leaderboard/types/dapps/types';
import type { DefiDappLeaderboardRow } from '$lib/domains/leaderboard/types/defi/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

export function mapDappLeaderboardRow(row: DappLeaderboardRow): UnifiedLeaderboardRow {
  return {
    address: row.address,
    icon: row.metadata?.logo,
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
    totalScore: row.score,
  };

  return out;
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

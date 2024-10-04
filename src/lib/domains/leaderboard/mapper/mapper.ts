import type { DappLeaderboardRow, UserLeaderboardRow } from '../types/dapps/types';
import type { UnifiedLeaderboardRow } from '../types/shared/types';

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

export function mapUserLeaderboardRow(row: UserLeaderboardRow): UnifiedLeaderboardRow {
  if (!row.position) {
    throw new Error('');
  }

  const out = {
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

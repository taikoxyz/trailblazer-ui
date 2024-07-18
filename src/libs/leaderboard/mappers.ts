import type { DappLeaderboardRow, DefiDappLeaderboardRow,UnifiedLeaderboardRow } from './types';

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

import type { DappLeaderboardRow } from '../types/dapps/types';
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

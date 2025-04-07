import { RanksToPoints, StatusRank } from './types';

export function getTaikoStatusNextRank(points: number): StatusRank {
  for (const rank of Object.values(StatusRank)) {
    if (points < RanksToPoints[rank]) {
      return rank;
    }
  }

  return StatusRank.Based; // If already at the highest rank
}

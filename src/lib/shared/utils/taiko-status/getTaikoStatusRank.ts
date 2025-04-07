import { RanksToPoints, StatusRank } from './types';

export function getTaikoStatusRank(points: number): StatusRank {
  let currentRank: StatusRank = StatusRank.None;

  for (const rank of Object.values(StatusRank)) {
    if (points >= RanksToPoints[rank]) {
      currentRank = rank;
    } else {
      break;
    }
  }

  return currentRank;
}

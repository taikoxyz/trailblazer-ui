import { getTaikoStatusRank } from './getTaikoStatusRank';
import { StatusRank } from './types';

export function getTaikoStatusRankBackgroundColorCss(points: number): string {
  const rank = getTaikoStatusRank(points);
  switch (rank) {
    case StatusRank.None:
      return 'bg-[#E3E3E3]';
    case StatusRank.Bronze:
      return 'bg-[#FFF6E2]';
    case StatusRank.Silver:
      return 'bg-[#E3E3E3]';
    case StatusRank.Gold:
      return 'bg-[#FFF6E2]';
    case StatusRank.Platinum:
      return 'bg-[#EBF6FF]';
    case StatusRank.Based:
      return 'bg-[#FFEEF9]';
    default:
      throw new Error('Invalid rank');
  }
}

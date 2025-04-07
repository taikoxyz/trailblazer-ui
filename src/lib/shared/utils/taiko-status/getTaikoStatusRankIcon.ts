import { getTaikoStatusRank } from './getTaikoStatusRank';

export function getTaikoStatusRankIcon(points: number): string {
  const iconName = getTaikoStatusRank(points).toLowerCase();
  return `/taiko-status/${iconName}.svg`;
}

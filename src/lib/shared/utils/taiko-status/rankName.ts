import { getTaikoStatusNextRank } from './getTaikoStatusNextRank';
import { getTaikoStatusRank } from './getTaikoStatusRank';
import type { StatusRank } from './types';

export function formatTaikoStatusRankName(rank: StatusRank): string {
  return rank.charAt(0).toUpperCase() + rank.slice(1);
}

export function getTaikoStatusRankName(points: number): string {
  return formatTaikoStatusRankName(getTaikoStatusRank(points));
}

export function getTaikoStatusNextRankName(points: number): string {
  return formatTaikoStatusRankName(getTaikoStatusNextRank(points));
}

import type { Address } from 'viem';

import { RanksToPoints, type StatusRank } from '$lib/domains/taiko-status/types';

import { TaikoStatusAdapter } from '../adapter/TaikoStatusAdapter';

export interface TaikoStatusInfo {
  rank: StatusRank;
  points: number;
  icon: string;
  name: string;
}

export class TaikoStatusService {
  // adapters
  private adapter: TaikoStatusAdapter;

  constructor(adapter?: TaikoStatusAdapter) {
    this.adapter = adapter || new TaikoStatusAdapter();
  }

  async getUserPoints(address: Address): Promise<number> {
    return this.adapter.getUserPoints(address);
  }

  async getUserRank(address: Address): Promise<StatusRank> {
    return this.adapter.getUserRank(address);
  }

  getRank(points: number): StatusRank {
    return this.adapter.getRank(points);
  }

  getNextRank(points: number): StatusRank {
    return this.adapter.getNextRank(points);
  }

  getRankBackgroundColor(points: number): string {
    return this.adapter.getRankBackgroundColor(points);
  }

  getRankIcon(points: number): string {
    return this.adapter.getRankIcon(points);
  }

  getRankName(points: number): string {
    return this.adapter.getRankName(points);
  }

  async getTaikoStatus(address: Address): Promise<{ current: TaikoStatusInfo; next: TaikoStatusInfo }> {
    const points = await this.adapter.getUserPoints(address);
    const rank = this.adapter.getRank(points);

    const nextRank = this.adapter.getNextRank(points);
    const nextPoints = RanksToPoints[nextRank];
    return {
      current: {
        rank,
        points,
        name: this.adapter.getRankName(points),
        icon: this.adapter.getRankIcon(points),
      },
      next: {
        rank: nextRank,
        points: nextPoints,
        name: this.adapter.getRankName(nextPoints),
        icon: this.adapter.getRankIcon(nextPoints),
      },
    };
  }
}

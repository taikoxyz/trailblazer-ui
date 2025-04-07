import type { Address } from 'viem';

import type { StatusRank } from '$lib/domains/taiko-status/types';

import { TaikoStatusAdapter } from '../adapter/TaikoStatusAdapter';

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
}

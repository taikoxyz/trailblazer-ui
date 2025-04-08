import axios from 'axios';
import type { Address } from 'viem';

import { RanksToPoints, StatusRank } from '$lib/domains/taiko-status/types';
import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('TaikoStatusAdapter');

export class TaikoStatusAdapter {
  private getEndpoint(isDev?: boolean): string {
    if (isDev || isDevelopmentEnv) {
      return '/api/mock-api/s4/taiko-status?address=';
    }
    return 'https://trailblazer.mainnet.taiko.xyz/s4/taikopass?address=';
  }

  async getUserPoints(address: Address): Promise<number> {
    log('getPoints', { address });
    try {
      const res = await axios.get(this.getEndpoint() + address);
      return res.data.points;
    } catch (e) {
      console.error('getTaikoStatus error', e);
      return 0;
    }
  }

  getRank(points: number): StatusRank {
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

  getRankName(points: number): string {
    const rank = this.getRank(points);
    return rank.charAt(0).toUpperCase() + rank.slice(1);
  }

  async getUserRank(address: Address): Promise<StatusRank> {
    log('getRank', { address });
    const points = await this.getUserPoints(address);
    return this.getRank(points);
  }

  getNextRank(points: number): StatusRank {
    for (const rank of Object.values(StatusRank)) {
      if (points < RanksToPoints[rank]) {
        return rank;
      }
    }

    return StatusRank.Based; // If already at the highest rank
  }

  getRankBackgroundColor(points: number): string {
    const rank = this.getRank(points);
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

  getRankIcon(points: number): string {
    const iconName = this.getRank(points).toLowerCase();
    return `/taiko-status/${iconName}.svg`;
  }

  formatTaikoStatusPoints(value: number): string {
    return Math.floor(value).toLocaleString();
  }

  getTaikoStatusPointsToNextRank(currentPoints: number): number {
    const ranks = [1000, 5000, 25_000, 100_000];
    const nextRank = ranks.find((rank) => rank > currentPoints);
    return nextRank ? nextRank - currentPoints : 0;
  }
}

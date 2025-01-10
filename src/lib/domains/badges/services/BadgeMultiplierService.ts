import type { Address } from 'viem';

import BadgeMultiplierAdapter from '../adapter/BadgeMultiplierAdapter';

export class BadgeMultiplierService {
  // adapters
  private adapter: BadgeMultiplierAdapter;

  constructor(adapter?: BadgeMultiplierAdapter) {
    this.adapter = adapter || new BadgeMultiplierAdapter();
  }

  /**
   * Fetches the badge multiplier
   *
   * @return {*}  {Promise<number>}
   * @memberof BadgeMultiplierService
   */
  async getBadgeMultiplier(address: Address, season: number) {
    return this.adapter.fetchBadgeMultiplier(address, season);
  }
}

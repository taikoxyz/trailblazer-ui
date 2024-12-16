import type { Address } from 'viem';

import BadgeMultiplierAdapter from '../adapter/BadgeMultiplierAdapter';
import type { S2Multipliers } from '../dto/multipliers';

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
  async getBadgeMultiplier(address: Address, season: number): Promise<S2Multipliers> {
    return this.adapter.fetchS2BadgeMultiplier(address, season);
  }
}

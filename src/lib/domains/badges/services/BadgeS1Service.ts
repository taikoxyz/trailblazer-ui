import { type Address } from 'viem';

import { BadgeS1Adapter } from '$lib/domains/badges/adapter/BadgeS1Adapter';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('BadgeS1Service');

export class BadgeS1Service {
  private adapter: BadgeS1Adapter;

  constructor(adapter?: BadgeS1Adapter) {
    this.adapter = adapter || new BadgeS1Adapter();
  }

  async getTokenId(address: Address, badgeId: number): Promise<number> {
    const tokenId = await this.adapter.getTokenId(address, badgeId);
    log('getTokenId', { address, badgeId, tokenId });
    return tokenId;
  }
}

import type { Address } from 'viem';

import { TaikoonAdapter } from '$lib/domains/nfts/adapter/TaikoonAdapter';
import type { NFT } from '$lib/shared/types/NFT';
import { getLogger } from '$libs/util/logger';

const log = getLogger('TaikoonService');

export class TaikoonService {
  getTaikoonTokens(address: string): Promise<NFT[]> {
    log('getTaikoonTokens', { address });
    throw new Error('Method not implemented.');
  }
  private adapter: TaikoonAdapter;

  constructor() {
    this.adapter = new TaikoonAdapter();
  }

  async getTaikoons(user: Address): Promise<NFT[]> {
    return this.adapter.fetchUserTaikoonNFTs(user);
  }
}

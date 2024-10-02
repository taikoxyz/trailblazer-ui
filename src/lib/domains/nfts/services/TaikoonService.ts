import type { Address } from 'viem';

import { TaikoonAdapter } from '$lib/domains/nfts/adapter/TaikoonAdapter';
import type { NFT } from '$lib/shared/types/NFT';
import { getLogger } from '$libs/util/logger';

const log = getLogger('TaikoonService');

export class TaikoonService {
  private adapter: TaikoonAdapter;

  constructor(adapter?: TaikoonAdapter) {
    this.adapter = adapter || new TaikoonAdapter();
  }

  async getTaikoons(user: Address): Promise<NFT[]> {
    log('getTaikoons', { user });
    const taikoons = await this.adapter.fetchUserTaikoonNFTs(user);
    log('getTaikoons result', { taikoons });
    return taikoons;
  }
}

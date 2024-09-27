import type { Address } from 'viem';

import type { NFT } from '$lib/shared/types/NFT';

import { BadgeService } from './BadgeService';
import { TaikoonService } from './TaikoonService';

export class CombinedNFTService {
  private taikoonService: TaikoonService;
  private badgeNFTService: BadgeService;

  constructor() {
    this.taikoonService = new TaikoonService();
    this.badgeNFTService = new BadgeService();
  }

  /**
   * Fetches all NFTs for a user, including badges and Taikoons.
   * @param address - The user's address.
   */
  async fetchAllNFTsForUser(address: Address): Promise<{
    taikoonNFTs: NFT[];
    badgeNFTs: NFT[];
  }> {
    const [taikoonNFTs, badgeNFTs] = await Promise.all([
      this.taikoonService.getTaikoonTokens(address),
      this.badgeNFTService.getBadgesForUser(address),
    ]);

    return { taikoonNFTs, badgeNFTs };
  }
}

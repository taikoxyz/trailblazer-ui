import axios from 'axios';
import type { Address } from 'viem';

import type { NFTMetadata } from '$lib/domains/dto/nft';
import type { NFT } from '$lib/shared/types/NFT';
import { getLogger } from '$libs/util/logger';

import { BadgeService } from './BadgeService';
import { TaikoonService } from './TaikoonService';

const log = getLogger('CombinedNFTService');

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
      this.taikoonService.getTaikoons(address),
      this.badgeNFTService.getBadgesForUser(address),
    ]);
    log('fetchAllNFTsForUser', { address, taikoonNFTs, badgeNFTs });
    return { taikoonNFTs, badgeNFTs };
  }

  /**
   * Fetches the metadata for an NFT.
   *
   * @param {NFT} nft
   * @return {*}  {(Promise<NFTMetadata | null>)}
   * @memberof CombinedNFTService
   */
  async getNFTMetadata(nft: NFT): Promise<NFTMetadata | null> {
    log('getNFTUrl', { nft });
    try {
      const tokenUriUrl = `/api/proxy?url=${encodeURIComponent(nft.src)}`;
      const src = await axios.get(tokenUriUrl);
      return src.data;
    } catch (error) {
      log('getNFTUrl error', { error });
      return null;
    }
  }
}

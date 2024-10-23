import axios from 'axios';
import { type Address } from 'viem';

import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import type { NFT } from '$lib/shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

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
  async fetchAllNFTsForUser(address: Address): Promise<NFT[]> {
    const nfts = await this.badgeNFTService.fetchAllNFTsForUser(address);
    log('fetchAllNFTsForUser', { address, nfts });
    return nfts;
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
    if (!nft.tokenUri) return null;
    try {
      const tokenUriUrl = `/api/proxy?url=${encodeURIComponent(nft.tokenUri)}`;
      const src = await axios.get(tokenUriUrl);
      return src.data;
    } catch (error) {
      log('getNFTUrl error', { error });
      return null;
    }
  }
}

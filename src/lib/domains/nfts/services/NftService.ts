import axios from 'axios';
import { type Address } from 'viem';

import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import { Movements } from '$lib/domains/profile/types/types';
import { type NFT, TokenType } from '$lib/shared/types/NFT';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { getLogger } from '$shared/utils/logger';
import generateBadgeMetadata from '$shared/utils/nfts/generateBadgeMetadata';

import { NftAdapter } from '../adapter/NftAdapter';

const log = getLogger('NftService');

export class NftService {
  private adapter: NftAdapter;

  constructor() {
    this.adapter = new NftAdapter();
  }

  /**
   * Fetches the metadata for an NFT.
   *
   * @param {NFT} nft
   * @return {*}  {(Promise<NFTMetadata | null>)}
   * @memberof NftService
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
  /**
   * Fetches the NFTs for a user
   * - Taikoons
   * - Snaefell
   * - s1 & s1 Trailblazer Badges
   *
   * @param {NFT} nft
   * @return {*}  {(Promise<NFT[]>)}
   * @memberof NftService
   */
  async fetchAllNFTsForUser(address: Address): Promise<NFT[]> {
    log('fetchAllNFTsForUser', { address });

    try {
      const tokens = await this.adapter.fetchTaikoTokensForUser(address);
      const flatTokens: NFT[] = [];
      for (const token of tokens) {
        if (token.metadata.badgeId !== undefined) {
          const badgeId = token.metadata.badgeId as number;
          const movement = token.metadata.movement as Movements;

          flatTokens.push({
            ...token,
            metadata: {
              ...token.metadata,
              ...generateBadgeMetadata(badgeId, movement),
            },
          });
        } else {
          const res = await axios.get(`/api/proxy?url=${token.tokenUri}`, globalAxiosConfig);

          flatTokens.push({
            ...token,
            metadata: res.data,
          });
        }
      }

      return flatTokens;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.account is null') {
        // account does not exist, skip
        return [];
      }
      console.error(e);
      throw e;
    }
  }

  /**
   * Returns a parametrized mock badge
   *
   * @param {NFT} nft
   * @return {*}  {(Promise<NFT>)}
   * @memberof NftService
   */
  getMockBadge(contract: Address, badgeId: number, movement?: Movements): NFT {
    const badge = {
      tokenId: -1,
      tokenUri: '',
      address: contract,
      metadata: {
        ...generateBadgeMetadata(badgeId, movement),
        erc: TokenType.Unknown,
      },
    } satisfies NFT;

    return badge;
  }
}

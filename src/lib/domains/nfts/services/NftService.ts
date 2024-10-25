import axios from 'axios';
import { type Address, isAddressEqual } from 'viem';

import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import { Movements } from '$lib/domains/profile/types/types';
import { type NFT, TokenType } from '$lib/shared/types/NFT';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import getBadgeURI from '$shared/utils/nfts/getBadgeURI';

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
      const tokens = await this.adapter.fetchForUser(address);
      const flatTokens: NFT[] = [];
      for (const token of tokens) {
        let uri = '';

        if (token.metadata.badgeId !== undefined) {
          const badgeId = token.metadata.badgeId as number;
          const movement = token.metadata.movement as Movements;
          if (isAddressEqual(trailblazersBadgesAddress[chainId], token.address)) {
            // s1 badge
            uri = getBadgeURI(badgeId);
          } else if (isAddressEqual(trailblazersBadgesS2Address[chainId], token.address)) {
            // s2 badge
            uri = getBadgeURI(badgeId, movement);
          }

          flatTokens.push({
            ...token,
            metadata: {
              ...token.metadata,
              image: `${uri}.png`,
              'video/mp4': `${uri}.mp4`,
              'video/webm': `${uri}.webm`,
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
    let uri = '';
    if (isAddressEqual(trailblazersBadgesAddress[chainId], contract)) {
      uri = getBadgeURI(badgeId);
    }

    if (isAddressEqual(trailblazersBadgesS2Address[chainId], contract)) {
      uri = getBadgeURI(badgeId, movement || Movements.Dev);
    }

    const badge = {
      tokenId: -1,

      tokenUri: '',
      address: contract,
      metadata: {
        erc: TokenType.Unknown,
        badgeId,
        movement: movement || Movements.Dev,
        image: `${uri}.png`,
        'video/mp4': `${uri}.mp4`,
        'video/webm': `${uri}.webm`,
      },
    } satisfies NFT;

    return badge;
  }
}

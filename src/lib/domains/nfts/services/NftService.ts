import axios from 'axios';
import { type Address, isAddressEqual } from 'viem';

import { trailblazersBadgesAddress } from '$generated/abi';
import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import { Movements, Seasons } from '$lib/domains/profile/types/types';
import { type NFT } from '$lib/shared/types/NFT';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { chainId } from '$shared/utils/chain';
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
      let tokenBaseUri = nft.tokenUri;
      if (!tokenBaseUri.startsWith('https://')) {
        tokenBaseUri = `https://taikonfts.4everland.link/ipfs/${tokenBaseUri}`;
      }

      const tokenUriUrl = `/api/proxy?url=${encodeURIComponent(tokenBaseUri)}`;
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
  async fetchTaikoTokensForUser(address: Address): Promise<NFT[]> {
    log('fetchTaikoTokensForUser', { address });

    try {
      const tokens = await this.adapter.fetchTaikoTokensForUser(address);
      const flatTokens: NFT[] = [];
      for (const token of tokens) {
        if (token.metadata.badgeId !== undefined) {
          const badgeId = token.metadata.badgeId as number;
          const movement = token.metadata.movement as Movements;
          const season = isAddressEqual(trailblazersBadgesAddress[chainId], token.address)
            ? Seasons.Season1
            : Seasons.Season2;

          flatTokens.push({
            ...token,
            metadata: {
              ...token.metadata,
              ...generateBadgeMetadata(season, badgeId, movement),
            },
          });
        } else {
          let tokenBaseUri = token.tokenUri;
          if (!tokenBaseUri.startsWith('https://')) {
            tokenBaseUri = `https://taikonfts.4everland.link/ipfs/${tokenBaseUri}`;
          }

          const res = await axios.get(`/api/proxy?url=${tokenBaseUri}`, globalAxiosConfig);

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
}

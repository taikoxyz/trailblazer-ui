import axios from 'axios';
import { type Address, isAddressEqual } from 'viem';

import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
import getBadgeURI from '$lib/domains/badges/utils/getBadgeURI';
import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import { Movements } from '$lib/domains/profile/types/types';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';

import { BadgeS1Service } from '../../badges/services/BadgeS1Service';
import { CombinedNFTAdapter } from '../adapter/CombinedNFTAdapter';
import { TaikoonService } from './TaikoonService';

const log = getLogger('CombinedNFTService');

export class CombinedNFTService {
  private taikoonService: TaikoonService;
  private badgeS1Service: BadgeS1Service;
  private adapter: CombinedNFTAdapter;

  constructor() {
    this.taikoonService = new TaikoonService();
    this.badgeS1Service = new BadgeS1Service();
    this.adapter = new CombinedNFTAdapter();
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

  async fetchAllNFTsForUser(address: Address): Promise<NFT[]> {
    log('fetchAllNFTsForUser', { address });

    try {
      const tokens = await this.adapter.fetchAllNFTsForUser(address);
      const flatTokens = tokens.map((token: NFT) => {
        let uri = '';

        if (token.badgeId !== undefined && token.badgeId !== null) {
          if (isAddressEqual(trailblazersBadgesAddress[chainId], token.address)) {
            // s1 badge
            uri = getBadgeURI(token.badgeId);
          } else if (isAddressEqual(trailblazersBadgesS2Address[chainId], token.address)) {
            // s2 badge
            uri = getBadgeURI(token.badgeId, token.movement || Movements.Dev);
          }
        } else {
          // todo: fetch from uri
        }

        return {
          ...token,
          assets: {
            image: `${uri}.png`,
            video: {
              mp4: `${uri}.mp4`,
              webm: `${uri}.webm`,
            },
          },
        } satisfies NFT;
      });

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
      erc: 202,
      badgeId,
      tokenUri: '',
      address: contract,
      assets: {
        image: `${uri}.png`,
        video: {
          mp4: `${uri}.mp4`,
          webm: `${uri}.webm`,
        },
      },
      movement: movement || Movements.Dev,
    } satisfies NFT;

    return badge;
  }
}

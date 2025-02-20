import axios from 'axios';
import { type Address } from 'viem';

import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import { getMovementName, Movements } from '$lib/domains/profile/types/types';
import {
  type BadgeDetailsByFaction,
  type BadgeDetailsByMovement,
  type BadgesByFaction,
  type NFT,
  type TBBadge,
} from '$lib/shared/types/NFT';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { isBadgeLocked } from '$shared/utils/badges/isBadgeLocked';
import { getLogger } from '$shared/utils/logger';

import { NftAdapter } from '../adapter/NftAdapter';
import { FactionNames, getFactionName } from '../types/badges/types';

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
      log('getNFTMetadata error', { error }, nft);
      return null;
    }
  }

  /**
   * Fetches the metadata for a badge NFT.
   *
   * @param {number} badgeId
   * @param {Movements} movement
   * @return {*}  {(Promise<NFTMetadata | null>)}
   * @memberof NftService
   */
  async getBadgeNFTMetadata(badgeId: number, movement: Movements): Promise<NFTMetadata | null> {
    try {
      const badgeType: FactionNames = getFactionName(badgeId) as FactionNames;
      const movementName = getMovementName(movement as Movements);

      const path = `/badges/${movementName}/${badgeType}`.toLowerCase();
      return {
        image: `${path}.png`,
        'video/mp4': `${path}.mp4`,
      } satisfies NFTMetadata;
    } catch (error) {
      log('getNFTMetadata error', { error });
      return null;
    }
  }

  async getStataticPath(nft: TBBadge): Promise<string | null> {
    if (!nft.metadata) throw new Error('NFT does not have metadata');

    const badgeType: FactionNames = getFactionName(nft.badgeId as number) as FactionNames;
    const movement = getMovementName(nft.movement as Movements);

    const path = `/badges/${movement}/${badgeType}`.toLowerCase();
    return path;
  }

  /**
   * Fetches the NFTs for a user
   * - Taikoons
   * - Snaefell
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
        {
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

  /**
   * Fetches the Badges for a user by faction
   *
   * @param {NFT} nft
   * @return {*}  {(Promise<BadgeCollection[]>)}
   * @memberof NftService
   */
  async fetchBadgesForUser(address: Address): Promise<BadgeDetailsByMovement> {
    log('fetchBadgesForUser', { address });
    try {
      const badgesByMovement = await this.adapter.fetchBadgesByMovementForUser(address);

      const simplifiedBadgesByMovement: BadgeDetailsByMovement = {
        [Movements.Devs]: this.mapFactions(badgesByMovement[Movements.Devs]),
        [Movements.Minnows]: this.mapFactions(badgesByMovement[Movements.Minnows]),
        [Movements.Whales]: this.mapFactions(badgesByMovement[Movements.Whales]),
      };
      log('simplifiedBadgesByMovement', simplifiedBadgesByMovement);
      return simplifiedBadgesByMovement;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Maps factions to simplified structure with one NFT per faction and total count.
   *
   * @param factions
   * @returns Simplified factions with badge and total count
   */
  mapFactions(factions: BadgesByFaction): BadgeDetailsByFaction {
    const defaultFactionStructure: BadgeDetailsByFaction = {
      [FactionNames.Ravers]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Ravers },
      [FactionNames.Robots]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Robots },
      [FactionNames.Bouncers]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Bouncers },
      [FactionNames.Masters]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Masters },
      [FactionNames.Monks]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Monks },
      [FactionNames.Drummers]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Drummers },
      [FactionNames.Androids]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Androids },
      [FactionNames.Shinto]: { badge: null, total: 0, allBadges: null, faction: FactionNames.Shinto },
    };

    return Object.entries(defaultFactionStructure).reduce((acc, [faction]) => {
      const nfts = factions[faction as keyof BadgesByFaction] || [];
      const firstNftNotFrozen = nfts.find((nft) => isBadgeLocked(nft) === false);
      const firstNft = firstNftNotFrozen || nfts[0] || null;

      acc[faction as keyof BadgesByFaction] = {
        badge: firstNft,
        total: nfts.length,
        allBadges: nfts,
        faction: faction as FactionNames,
      };
      return acc;
    }, defaultFactionStructure);
  }
}

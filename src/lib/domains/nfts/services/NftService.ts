import axios from 'axios';
import { type Address, isAddressEqual } from 'viem';

import { trailblazersBadgesAddress } from '$generated/abi';
import type { NFTMetadata } from '$lib/domains/nfts/types/shared/types';
import { getMovementName, Movements, Seasons } from '$lib/domains/profile/types/types';
import { type BadgesByFaction, type BadgesByMovement, type NFT } from '$lib/shared/types/NFT';
import { globalAxiosConfig } from '$shared/services/api/axiosClient';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import generateBadgeMetadata from '$shared/utils/nfts/generateBadgeMetadata';

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
    log('getNFTMetadata', { nft });
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

  async getStataticPath(nft: NFT): Promise<string | null> {
    log('getStataticPath', { nft });

    if (!nft.metadata) throw new Error('NFT does not have metadata');

    const badgeType: FactionNames = getFactionName(nft.metadata.badgeId as number) as FactionNames;
    const movement = getMovementName(nft.metadata.movement as Movements);

    const path = `/badges/${movement}/${badgeType}`.toLowerCase();
    log('getStataticPath result', { path });
    return path;
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

  /**
   * Fetches the Badges for a user by faction
   *
   * @param {NFT} nft
   * @return {*}  {(Promise<BadgeCollection[]>)}
   * @memberof NftService
   */
  async fetchBadgesForUser(address: Address): Promise<BadgesByMovement> {
    log('fetchBadgesForUser', { address });
    try {
      const badgesByMovement = await this.adapter.fetchBadgesByMovementForUser(address);

      const simplifiedBadgesByMovement: BadgesByMovement = {
        [Movements.Devs]: this.mapFactions(badgesByMovement[Movements.Devs]),
        [Movements.Minnows]: this.mapFactions(badgesByMovement[Movements.Minnows]),
        [Movements.Whales]: this.mapFactions(badgesByMovement[Movements.Whales]),
      };

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
   * @returns Simplified factions
   */
  mapFactions(factions: BadgesByFaction): BadgesByFaction {
    const defaultFactionStructure: BadgesByFaction = {
      [FactionNames.Ravers]: [],
      [FactionNames.Robots]: [],
      [FactionNames.Bouncers]: [],
      [FactionNames.Masters]: [],
      [FactionNames.Monks]: [],
      [FactionNames.Drummers]: [],
      [FactionNames.Androids]: [],
      [FactionNames.Shinto]: [],
    };

    return Object.entries(defaultFactionStructure).reduce((acc, [faction]) => {
      const nfts = factions[faction as keyof BadgesByFaction] || [];
      const firstNft = nfts[0] ? [nfts[0]] : [];
      const firstNftNotFrozen = nfts.find((nft) => !nft.frozen)
        ? ([nfts.find((nft) => !nft.frozen)].filter(Boolean) as NFT[])
        : [];

      acc[faction as keyof BadgesByFaction] = firstNftNotFrozen.length > 0 ? firstNftNotFrozen : firstNft;
      return acc;
    }, defaultFactionStructure);
  }
}

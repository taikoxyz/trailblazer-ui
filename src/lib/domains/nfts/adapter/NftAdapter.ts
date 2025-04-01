import { type Address } from 'viem';

import type { Token } from '$generated/graphql/badges';
import { Movements } from '$lib/domains/profile/types/types';
import type { BadgesByFaction, BadgesByMovement, NFT, TBBadge } from '$lib/shared/types/NFT';
import { badgesSubgraphClient, taikoonsSubgraphClient } from '$shared/services/graphql/client';
import {
  USER_NFTS_FETCH_BADGES_QUERY,
  USER_NFTS_FETCH_TAIKOONS_AND_SNAEFELLS_QUERY,
} from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';

import { FactionNames, getFactionName } from '../types/badges/types';
import type { NFTMetadata } from '../types/shared/types';

const log = getLogger('NftAdapter');
export class NftAdapter {
  async fetchBadgesByMovementForUser(address: Address): Promise<BadgesByMovement> {
    log('fetchBadgesByMovementForUser', { address });
    try {
      const badgesByMovement = {
        [Movements.Devs]: {
          [FactionNames.Ravers]: [],
          [FactionNames.Robots]: [],
          [FactionNames.Bouncers]: [],
          [FactionNames.Masters]: [],
          [FactionNames.Monks]: [],
          [FactionNames.Drummers]: [],
          [FactionNames.Androids]: [],
          [FactionNames.Shinto]: [],
        },
        [Movements.Minnows]: {
          [FactionNames.Ravers]: [],
          [FactionNames.Robots]: [],
          [FactionNames.Bouncers]: [],
          [FactionNames.Masters]: [],
          [FactionNames.Monks]: [],
          [FactionNames.Drummers]: [],
          [FactionNames.Androids]: [],
          [FactionNames.Shinto]: [],
        },
        [Movements.Whales]: {
          [FactionNames.Ravers]: [],
          [FactionNames.Robots]: [],
          [FactionNames.Bouncers]: [],
          [FactionNames.Masters]: [],
          [FactionNames.Monks]: [],
          [FactionNames.Drummers]: [],
          [FactionNames.Androids]: [],
          [FactionNames.Shinto]: [],
        },
      } as BadgesByMovement;
      const badgesGraphqlResponse = await badgesSubgraphClient.query({
        query: USER_NFTS_FETCH_BADGES_QUERY,
        variables: { address: address },
      });
      log('fetchBadgesByMovementForUser response', { badgesGraphqlResponse });
      if (!badgesGraphqlResponse || !badgesGraphqlResponse.data || !badgesGraphqlResponse.data.tokens) {
        // account does not exist, skip and return empty
        return badgesByMovement;
      }
      const { tokens } = badgesGraphqlResponse.data;
      log('fetchBadgesByMovementForUser tokens', { tokens });

      tokens.forEach((token: Token) => {
        const address = token.contract as Address;
        const tokenId = parseInt(token.tokenId);
        const badgeId = parseInt(token.badgeId);
        const movement = parseInt(token.movement || '0') as Movements;
        const tokenUri = token.uri || '';
        const faction = getFactionName(badgeId);

        if (!faction) {
          log(`Unknown faction for badgeId: ${badgeId} token:`, token);
          return;
        }

        const metadata: NFTMetadata = {
          name: '',
          description: '',
          image: '',
          animation_url: '',
          external_url: '',
          attributes: [],
        };

        const badge = {
          address,
          badgeId,
          movement,
          tokenId,
          metadata,
          tokenUri,
          faction,
          frozenAt: token.frozenAt || null,
        } satisfies TBBadge;
        log('fetchBadgesByMovementForUser badge', { badge });
        badgesByMovement[movement][faction].push(badge);
      });

      log('fetchBadgesByMovementForUser badgesByMovement', { badgesByMovement });
      return badgesByMovement;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Fetches the badges for a user collected by faction
   * @param {Address} address
   * @return {*}  {Promise<BadgeByFaction>}
   * @memberof NftAdapter
   */
  async fetchBadgesAsFactionsForUser(address: Address): Promise<BadgesByFaction> {
    log('fetchBadgesForUser', { address });
    try {
      const badgesByFaction = {
        [FactionNames.Ravers]: [],
        [FactionNames.Robots]: [],
        [FactionNames.Bouncers]: [],
        [FactionNames.Masters]: [],
        [FactionNames.Monks]: [],
        [FactionNames.Drummers]: [],
        [FactionNames.Androids]: [],
        [FactionNames.Shinto]: [],
      } as BadgesByFaction;
      const badgesGraphqlResponse = await badgesSubgraphClient.query({
        query: USER_NFTS_FETCH_BADGES_QUERY,
        variables: { address: address },
      });
      log('fetchBadgesForUser response', { badgesGraphqlResponse });
      if (!badgesGraphqlResponse || !badgesGraphqlResponse.data || !badgesGraphqlResponse.data.tokens) {
        log('fetchBadgesForUser no tokens found');
        // account does not exist, skip
        return badgesByFaction;
      }
      const { tokens } = badgesGraphqlResponse.data;
      log('fetchBadgesForUser tokens', { tokens });
      tokens.forEach((token: Token) => {
        const address = token.contract as Address;
        const tokenId = parseInt(token.tokenId);
        const badgeId = parseInt(token.badgeId);
        const movement = parseInt(token.movement || '0') as Movements;
        const tokenUri = token.uri || '';
        const faction = getFactionName(badgeId);

        if (!faction) {
          log(`Unknown faction for badgeId: ${badgeId}`);
          return;
        }
        const metadata: NFTMetadata = {
          name: '',
          description: '',
          image: '',
          animation_url: '',
          external_url: '',
          attributes: [],
        };

        badgesByFaction[faction].push({
          address,
          tokenId,
          badgeId,
          movement,
          metadata,
          faction,
          tokenUri,
          frozenAt: token.frozenAt || null,
        } satisfies TBBadge);
      });
      log('fetchBadgesForUser badgesByFaction', { badgesByFaction });
      return badgesByFaction;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Fetches the NFTs for a user
   * - snaefell
   * - taikoons
   * - s1 badges
   * - s2 badges
   * @param {NFT} nft
   * @return {*}  {(Promise<NFT[]>)}
   * @memberof NftAdapter
   */
  async fetchTaikoTokensForUser(address: Address): Promise<NFT[]> {
    log('fetchTaikoTokensForUser', { address });

    try {
      const [taikoonsAndSnaefellsGraphqlResponse] = await Promise.all([
        taikoonsSubgraphClient.query({
          query: USER_NFTS_FETCH_TAIKOONS_AND_SNAEFELLS_QUERY,
          variables: { address },
        }),
      ]);

      if (
        !taikoonsAndSnaefellsGraphqlResponse ||
        !taikoonsAndSnaefellsGraphqlResponse.data ||
        !taikoonsAndSnaefellsGraphqlResponse.data.tokens
      ) {
        // account does not exist, skip
        return [];
      }

      const { tokens: otherTokens } = taikoonsAndSnaefellsGraphqlResponse?.data || { tokens: [] };

      log('fetchTaikoTokensForUser tokens', { otherTokens });
      const tokens = [...otherTokens];

      const flatTokens = tokens.map((token: Token) => {
        const address = token.contract as Address;
        const tokenId = parseInt(token.tokenId);
        const tokenUri = token.uri || '';

        const metadata: NFTMetadata = {
          name: '',
          description: '',
          image: '',
          animation_url: '',
          external_url: '',
          attributes: [],
        };
        return {
          address,
          tokenId,
          metadata,
          tokenUri,
          frozenAt: token.frozenAt || null,
        } satisfies NFT;
      });

      log('fetchTaikoTokensForUser flatTokens', { flatTokens });
      return flatTokens;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.account is null') {
        // account does not exist, skip
        return [];
      }
      throw e;
    }
  }
}

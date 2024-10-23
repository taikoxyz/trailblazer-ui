import { readContract } from '@wagmi/core';
import { type Address } from 'viem';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import type { Token } from '$generated/graphql';
import { FactionNames, FACTIONS } from '$lib/domains/nfts/types/badges/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { USER_BADGES_S1_QUERY, USER_NFTS_FETCH_QUERY } from '$lib/shared/services/graphql/queries';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import type { NFT } from '$shared/types/NFT';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('BadgeAdapter');

export class BadgeAdapter {
  /**
   * Fetches user S1 badges from the graphql endpoint.
   *
   * @param {Address} address the user's address
   * @return {*}  {Promise<IUserBadges>}
   * @memberof ProfileApiAdapter
   */
  async fetchUserS1Badges(address: Address) {
    log('fetchUserS1Badges', { address });
    const badgeResult: {
      [key in FactionNames]: { hasBadge: boolean; badgeId: number | null; tokenId: number | null };
    } = {
      [FactionNames.Ravers]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Robots]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Bouncers]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Masters]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Monks]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Drummers]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Androids]: { hasBadge: false, badgeId: null, tokenId: null },
      [FactionNames.Shinto]: { hasBadge: false, badgeId: null, tokenId: null },
    };

    try {
      const graphqlResponse = await graphqlClient.query({
        query: USER_BADGES_S1_QUERY,
        variables: { address: address.toLocaleLowerCase() },
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
        // account does not exist, skip
        return badgeResult;
      }

      const { s1MultiplierNfts } = graphqlResponse.data.account;
      log('fetchUserS1Badges result for s1MultiplierNfts', { s1MultiplierNfts });
      for (const badgeId of Object.values(FACTIONS)) {
        for (const badge of s1MultiplierNfts) {
          const currentBadgeId = parseInt(badge.badgeId);

          if (currentBadgeId === badgeId) {
            const key = Object.values(FactionNames)[badgeId];
            badgeResult[key] = { hasBadge: true, badgeId: currentBadgeId, tokenId: badge.tokenId };
          }
        }
      }
      log('fetchUserS1Badges', { badgeResult });
      return badgeResult;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.account is null') {
        // account does not exist, skip
        return badgeResult;
      }
      throw e;
    }
  }

  /**
   * Fetches the token id for a given address and faction id.
   *
   * @param {Address} address
   * @param {number} factionId
   * @return {*}  {Promise<number>}
   * @memberof BadgeAdapter
   */
  async getTokenId(address: Address, factionId: number): Promise<number> {
    const contractAddress = trailblazersBadgesAddress[chainId];

    const result = await readContract(wagmiConfig, {
      abi: trailblazersBadgesAbi,
      address: contractAddress,
      functionName: 'getTokenId',
      args: [address, BigInt(factionId)],
      chainId,
    });

    return parseInt(result.toString(16), 16);
  }

  async fetchAllNFTsForUser(address: Address): Promise<NFT[]> {
    log('fetchAllNFTsForUser', { address });

    try {
      const graphqlResponse = await graphqlClient.query({
        query: USER_NFTS_FETCH_QUERY,
        variables: { address: address.toLocaleLowerCase() },
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.tokens) {
        // account does not exist, skip
        return [];
      }
      const { tokens } = graphqlResponse.data;
      const flatTokens = tokens.map((token: Token) => {
        return {
          address: token.contract,
          tokenId: token.tokenId,
          badgeId: parseInt(token.badgeId),
          erc: token.erc,
          movement: token.movement,
          tokenUri: token.uri || '',
          src: '',
        } satisfies NFT;
      });

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

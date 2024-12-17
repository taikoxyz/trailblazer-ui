import { type Address } from 'viem';

import type { Token } from '$generated/graphql';
import type { Movements } from '$lib/domains/profile/types/types';
import type { NFT, TokenType } from '$lib/shared/types/NFT';
import { badgesSubgraphClient, taikoonsSubgraphClient } from '$shared/services/graphql/client';
import { USER_NFTS_FETCH_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('NftAdapter');
export class NftAdapter {
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
      const badgesGraphqlResponse = await badgesSubgraphClient.query({
        query: USER_NFTS_FETCH_QUERY,
        variables: { address: address },
      });

      const taikoonsAndSnaefellsGraphqlResponse = await taikoonsSubgraphClient.query({
        query: USER_NFTS_FETCH_QUERY,
        variables: { address: address },
      });

      if (
        (!badgesGraphqlResponse || !badgesGraphqlResponse.data || !badgesGraphqlResponse.data.tokens) &&
        (!taikoonsAndSnaefellsGraphqlResponse ||
          !taikoonsAndSnaefellsGraphqlResponse.data ||
          !taikoonsAndSnaefellsGraphqlResponse.data.tokens)
      ) {
        // account does not exist, skip
        return [];
      }

      const { tokens: badgeTokens } = badgesGraphqlResponse?.data || { tokens: [] };
      const { tokens: otherTokens } = taikoonsAndSnaefellsGraphqlResponse?.data || { tokens: [] };

      const tokens = [...badgeTokens, ...otherTokens];

      const flatTokens = tokens.map((token: Token) => {
        const address = token.contract as Address;
        const tokenId = parseInt(token.tokenId);
        const badgeId = parseInt(token.badgeId);
        const erc = parseInt(token.erc) as TokenType;
        const movement = parseInt(token.movement || '0') as Movements;
        const tokenUri = token.uri || '';
        const frozen = token.frozen || false;

        return {
          address,
          tokenId,
          tokenUri,
          metadata: {
            badgeId: isNaN(badgeId) ? undefined : badgeId,
            erc,
            movement: isNaN(movement) ? undefined : movement,
            frozen,
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
      throw e;
    }
  }
}

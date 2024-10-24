import { type Address } from 'viem';

import type { Token } from '$generated/graphql';
import type { NFT } from '$lib/shared/types/NFT';
import { graphqlClient } from '$shared/services/graphql/client';
import { USER_NFTS_FETCH_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('CombinedNFTAdapter');
export class CombinedNFTAdapter {
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
        const address = token.contract as Address;
        const tokenId = parseInt(token.tokenId);
        const badgeId = parseInt(token.badgeId);
        const erc = parseInt(token.erc);
        const movement = parseInt(token.movement);
        const tokenUri = token.uri || '';

        return {
          address,
          tokenId,
          badgeId,
          erc,
          movement,
          tokenUri,
          assets: { image: '' },
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

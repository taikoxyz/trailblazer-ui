import { gql } from '@apollo/client/core';
import type { Address } from 'viem';

import { FactionNames, FACTIONS } from '$lib/domains/nfts/types/badges/types';
import { graphqlClient } from '$lib/shared/services/graphql/client';
import { getLogger } from '$libs/util/logger';

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
    const out = {
      [FactionNames.Ravers]: false,
      [FactionNames.Robots]: false,
      [FactionNames.Bouncers]: false,
      [FactionNames.Masters]: false,
      [FactionNames.Monks]: false,
      [FactionNames.Drummers]: false,
      [FactionNames.Androids]: false,
      [FactionNames.Shinto]: false,
    };

    try {
      const gqlQuery = gql`
        query UserBadges($address: String) {
          account(id: $address) {
            id
            s1Badges {
              id
              badgeId
            }
          }
        }
      `;
      const graphqlResponse = await graphqlClient.query({
        query: gqlQuery,
        variables: { address: address.toLocaleLowerCase() },
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
        // account does not exist, skip
        return out;
      }

      const { s1Badges } = graphqlResponse.data.account;
      log('fetchUserS1Badges', { s1Badges });
      for (const badgeId of Object.values(FACTIONS)) {
        for (const badge of s1Badges) {
          const currentBadgeId = parseInt(badge.badgeId);

          if (currentBadgeId === badgeId) {
            const key = Object.values(FactionNames)[badgeId];
            out[key] = true;
          }
        }
      }
      log('fetchUserS1Badges', { out });
      return out;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.account is null') {
        // account does not exist, skip
        return out;
      }
      throw e;
    }
  }
}

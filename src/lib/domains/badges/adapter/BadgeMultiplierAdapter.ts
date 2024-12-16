import type { Address } from 'viem';

import { badgesSubgraphClient } from '$shared/services/graphql/client';
import { GET_S2_BADGE_MULTIPLIER_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';

import type { S2Multipliers } from '../dto/multipliers';

const log = getLogger('BadgeMultiplierAdapter');

export default class BadgeMultiplierAdapter {
  /**
   * Fetches the S2 badge multiplier
   *
   * @return {*}
   * @memberof BadgeMultiplierAdapter
   */

  // TODO: rework to calculate based on ownership
  async fetchS2BadgeMultiplier(address: Address, season: number): Promise<S2Multipliers> {
    log('Fetching S2 badge multiplier', { address, season });
    try {
      const graphqlResponse = await badgesSubgraphClient.query({
        query: GET_S2_BADGE_MULTIPLIER_QUERY,
        variables: { address: address.toLowerCase() },
      });
      log('Fetched S2 badge multiplier', graphqlResponse);

      if (!graphqlResponse.data || !graphqlResponse.data.s2Multiplier) {
        throw new Error('No data in response');
      }

      const {
        devMultiplier,
        minnowMultiplier,
        snaefellMultiplier,
        taikoonMultiplier,
        whaleMultiplier,
        globalMultiplier,
      } = graphqlResponse.data.s2Multiplier;

      log('Individual multipliers', {
        devMultiplier,
        minnowMultiplier,
        snaefellMultiplier,
        taikoonMultiplier,
        whaleMultiplier,
        globalMultiplier,
      });

      return {
        devMultiplier: parseInt(devMultiplier),
        minnowMultiplier: parseInt(minnowMultiplier),
        snaefellMultiplier: parseInt(snaefellMultiplier),
        taikoonMultiplier: parseInt(taikoonMultiplier),
        whaleMultiplier: parseInt(whaleMultiplier),
        globalMultiplier: parseInt(globalMultiplier),
      };
    } catch (error) {
      throw new Error('Error fetching S2 badge multiplier');
    }
  }
}

import type { Address } from 'viem';

import { getAxiosInstance, globalAxiosConfig } from '$shared/services/api/axiosClient';
import { badgesSubgraphClient } from '$shared/services/graphql/client';
import { GET_S2_BADGE_MULTIPLIER_QUERY } from '$shared/services/graphql/queries';
import { getLogger } from '$shared/utils/logger';

import type { MultiplierApiResponse, S2Multipliers } from '../dto/multipliers';

const log = getLogger('BadgeMultiplierAdapter');

export default class BadgeMultiplierAdapter {
  /**
   * Fetches the badge multipliers
   *
   * @return {*}
   * @memberof BadgeMultiplierAdapter
   */

  async fetchBadgeMultiplier(address: Address, season: number) {
    log('Fetching badge multiplier', { address, season });
    try {
      const client = getAxiosInstance(season);
      const response = await client.get<MultiplierApiResponse>(`user/multiplier`, {
        ...globalAxiosConfig,
        params: { address },
      });
      log('Fetched badge multiplier', response);
      return response.data;
    } catch (error) {
      log('Error fetching badge multiplier', { error });
      throw new Error('Error fetching badge multiplier');
    }
  }

  /**
   * Fetches the S2 badge multiplier
   *
   * @return {*}
   * @memberof BadgeMultiplierAdapter
   */
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

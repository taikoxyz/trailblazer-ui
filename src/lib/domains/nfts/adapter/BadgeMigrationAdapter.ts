import { gql } from '@apollo/client/core';

import { graphqlClient } from '$lib/shared/services/graphql/client';
import { getLogger } from '$libs/util/logger';

const log = getLogger('BadgeMigrationAdapter');

export class BadgeMigrationAdapter {
  /**
   * Fetches the currently-enabled migration s1 badge ids
   *
   * @return {*}  {Promise<IUserBadges>}
   * @memberof ProfileApiAdapter
   */
  async fetchEnabledMigrations(): Promise<number[]> {
    log('fetchEnabledMigrations');
    const out: number[] = [];

    try {
      const gqlQuery = gql`
        query OpenMigrations($address: String) {
          openMigrations(where: { enabled: true }) {
            id
            enabled
          }
        }
      `;
      const graphqlResponse = await graphqlClient.query({
        query: gqlQuery,
      });

      if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.openMigrations) {
        // no open migrations, skip
        return out;
      }

      const { openMigrations } = graphqlResponse.data;
      log('fetchEnabledMigrations result for openMigrations', { openMigrations });
      for (const badge of openMigrations) {
        if (!badge.enabled) continue;
        const currentBadgeId = parseInt(badge.id);
        out.push(currentBadgeId);
      }
      log('fetchEnabledMigrations', { out });
      return out;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === 'graphqlResponse.data.openMigrations is null') {
        // no open migrations, skip
        return out;
      }
      throw e;
    }
  }
}

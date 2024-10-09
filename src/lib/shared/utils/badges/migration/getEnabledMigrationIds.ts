// returns all the contract-enabled badge migrations

import { gql } from '@apollo/client/core';

import { graphqlClient } from '$lib/shared/services/graphql/client';

export default async function getEnabledMigrationIds(): Promise<number[]> {
  try {
    const query = gql`
      query GetEnabledMigrations {
        enabledMigrations_collection {
          id
        }
      }
    `;

    const result = await graphqlClient.query({
      query,
      // variables: { address: address.toLocaleLowerCase() },
    });

    const items = result.data.enabledMigrations_collection;

    return items.map((item: { id: string }) => parseInt(item.id));
  } catch (e) {
    console.error(e);
    return [];
  }
}

// returns all the contract-enabled badge migrations

import { gql } from '@apollo/client/core';

import { badgesSubGraph } from '../badgesSubGraph';

export default async function getEnabledMigrationIds(): Promise<number[]> {
  try {
    const query = gql`
      query GetEnabledMigrations {
        enabledMigrations_collection {
          id
        }
      }
    `;

    const result = await badgesSubGraph.query({
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

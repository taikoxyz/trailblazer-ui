// returns all the contract-enabled badge migrations

import { gql } from '@apollo/client/core';

import { graphqlClient } from '$lib/shared/services/graphql/client';

export default async function getEnabledMigrationIds(): Promise<number[]> {
  try {
    const query = gql`
      query GetEnabledMigrations {
        openMigrations(where: {enabled:true}) {
    id,
    enabled
  }
      }
    `;

    const result = await graphqlClient.query({
      query,
    });

    const items = result.data.openMigrations;

    return items.map((item: { id: string }) => parseInt(item.id, 16));
  } catch (e) {
    console.error(e);
    return [];
  }
}

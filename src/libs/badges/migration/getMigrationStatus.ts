import { gql } from '@apollo/client/core';
import type { Address } from 'viem';

import { graphqlClient } from '$lib/shared/services/graphql/client';
import type { IBadgeMigration } from '$stores/badgeMigration';

export default async function getMigrationStatus(address: Address): Promise<IBadgeMigration> {
  const query = gql`
    query MigrationStatus($address: String) {
      badgeMigration(id: $address) {
        s1Badge {
          id
          badgeId
        }
        s2Badge {
          id
          badgeId
        }

        isStarted
        isCompleted

        pinkTampers
        purpleTampers

        claimExpirationTimeout
        tamperExpirationTimeout
      }
    }
  `;

  const result = await graphqlClient.query({
    query,
    variables: { address: address.toLocaleLowerCase() },
  });

  if (!result.data.badgeMigration) {
    return {
      isCompleted: false,
      isStarted: false,
      s1BadgeId: -1,
      pinkTampers: 0,
      purpleTampers: 0,
    };
  }

  const {
    isCompleted,
    isStarted,
    s1Badge,
    pinkTampers,
    purpleTampers,
    claimExpirationTimeout,
    tamperExpirationTimeout,
  } = result.data.badgeMigration;

  const claimExpirationTs = parseInt(claimExpirationTimeout) * 1000;
  const tamperExpirationTs = parseInt(tamperExpirationTimeout) * 1000;
  return {
    isCompleted,
    isStarted,
    s1BadgeId: s1Badge ? parseInt(s1Badge.badgeId) : -1,
    pinkTampers: parseInt(pinkTampers),
    purpleTampers: parseInt(purpleTampers),
    claimExpiration: claimExpirationTs > 0 ? new Date(claimExpirationTs) : undefined,
    tamperExpiration: tamperExpirationTs > 0 ? new Date(tamperExpirationTs) : undefined,
  };
}

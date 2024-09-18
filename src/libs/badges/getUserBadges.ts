import { gql } from '@apollo/client/core';
import type { Address } from 'viem';

import { FactionNames, FACTIONS } from '$configs/badges';

import { badgesSubGraph } from './badgesSubGraph';

export interface IUserBadges {
  [FactionNames.Ravers]: boolean;
  [FactionNames.Robots]: boolean;
  [FactionNames.Bouncers]: boolean;
  [FactionNames.Masters]: boolean;
  [FactionNames.Monks]: boolean;
  [FactionNames.Drummers]: boolean;
  [FactionNames.Androids]: boolean;
  [FactionNames.Shinto]: boolean;
}

export async function getUserBadges(address: Address): Promise<IUserBadges> {
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
        }
      }
    `;
    const graphqlResponse = await badgesSubGraph.query({
      query: gqlQuery,
      variables: { address: address.toLocaleLowerCase() },
    });

    if (!graphqlResponse || !graphqlResponse.data || !graphqlResponse.data.account) {
      // account does not exist, skip
      return out;
    }

    const { s1Badges } = graphqlResponse.data.account;

    let migrationBadgeId = -1;
    if (graphqlResponse.data.badgeMigration) {
      migrationBadgeId = parseInt(graphqlResponse.data.badgeMigration.s1Badge.badgeId);
    }

    for (const badgeId of Object.values(FACTIONS)) {
      for (const badge of s1Badges) {
        const currentBadgeId = parseInt(badge.badgeId);

        if (currentBadgeId === badgeId || badgeId === migrationBadgeId) {
          const key = Object.values(FactionNames)[badgeId];
          out[key] = true;
        }
      }
    }
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

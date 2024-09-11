/* eslint-disable @typescript-eslint/no-explicit-any */
// boilerplate file for migration and subgraph methods
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
import type { Address } from 'viem';

import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { badgeMigrationStore, type IBadgeMigration } from '$stores/badgeMigration';

import { FactionNames, FACTIONS } from '../../configs/badges';
import { getTokenId } from './getTokenId';

const subGraphEndpoint = isDevelopmentEnv
  ? 'https://api.goldsky.com/api/public/project_clz85cxrvng3n01ughcv5e7hg/subgraphs/tbz-hekla/0.0.3/gn'
  : '';
export const badgesSubGraph = new ApolloClient({
  uri: subGraphEndpoint,
  cache: new InMemoryCache(),
});

interface IUserBadges {
  [FactionNames.Ravers]: boolean;
  [FactionNames.Robots]: boolean;
  [FactionNames.Bouncers]: boolean;
  [FactionNames.Masters]: boolean;
  [FactionNames.Monks]: boolean;
  [FactionNames.Drummers]: boolean;
  [FactionNames.Androids]: boolean;
  [FactionNames.Shinto]: boolean;
}

export async function isApprovedToMigrate(address: Address, badgeId: number): Promise<boolean> {
  try {
    const query = gql`
      query IsApproved($address: String) {
        account(id: $address) {
          approvedForAll
          approvedS1Tokens {
            id
          }
        }
      }
    `;

    const result = await badgesSubGraph.query({
      query,
      variables: { address: address.toLocaleLowerCase() },
    });

    if (!result.data.account) {
      return false;
    }

    const { approvedForAll, approvedS1Tokens } = result.data.account;

    if (approvedForAll) {
      return true;
    }
    const tokenId = await getTokenId(address, badgeId);
    for (const token of approvedS1Tokens) {
      if (parseInt(token.id) === tokenId) {
        return true;
      }
    }

    return false;
  } catch (e: any) {
    if (e.message === 'result.data.account is null') {
      // account does not exist, skip
      return false;
    }

    throw e;
  }
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
  } catch (e: any) {
    if (e.message === 'graphqlResponse.data.account is null') {
      // account does not exist, skip
      return out;
    }
    throw e;
  }
}

export async function getMigrationStatus(address: Address): Promise<IBadgeMigration> {
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

  const result = await badgesSubGraph.query({
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

export async function updateMigrationStatus(address: Address) {
  const { isCompleted, isStarted, s1BadgeId, pinkTampers, purpleTampers, claimExpiration, tamperExpiration } =
    await getMigrationStatus(address);

  badgeMigrationStore.set({
    isCompleted,
    isStarted,
    s1BadgeId,
    pinkTampers,
    purpleTampers,
    claimExpiration,
    tamperExpiration,
  });
}

/*
export async function getNftInfo(address: Address): Promise<INftStore>{
    const balances = await getUserBadges(address)
    return {
        season1: {
            address: trailblazersBadgesAddress[chainId],
            balances
        }
    }
}

export async function updateNftInfo(address: Address){
    const data = await getNftInfo(address)
    nftStore.set(data)
}*/

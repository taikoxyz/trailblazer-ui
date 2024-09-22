import type { Address } from 'viem';

import { graphqlClient } from '$graphql/client';
import { GET_USER_BADGES } from '$graphql/queries/user';
import type { UserBadgesQuery, UserBadgesQueryVariables, UserNftsQuery } from '$graphql/types/generated';
import { getLogger } from '$libs/util/logger';

const log = getLogger('UserService');

/**
 * Fetches user badges from the GraphQL API.
 * @param address - The ID of the account/address.
 * @returns The Account data containing s1Badges or null.
 */
export const fetchUserBadges = async (address: Address): Promise<UserBadgesQuery['account']> => {
  log('Fetching user badges for address', address);
  try {
    const { data } = await graphqlClient.query<UserBadgesQuery, UserBadgesQueryVariables>({
      query: GET_USER_BADGES,
      variables: { address },
      fetchPolicy: 'cache-first',
    });
    log('Fetched user badges', data.account);
    return data.account;
  } catch (error) {
    console.error('Failed to fetch user badges', error);
    throw error;
  }
};

/**
 * Fetches user NFTs from the GraphQL API.
 * @param address - The ID of the account/address.
 * @returns The Account data containing s1MultiplierNfts or null.
 * @throws Error if the request fails.
 * @see {@link UserNftsQuery}
 */
export const fetchUserNFTs = async (address: Address): Promise<UserNftsQuery['account']> => {
  log('Fetching user NFTs for address', address);
  try {
    const { data } = await graphqlClient.query<UserNftsQuery, UserBadgesQueryVariables>({
      query: GET_USER_BADGES,
      variables: { address },
      fetchPolicy: 'cache-first',
    });
    log('Fetched user NFTs', data.account);
    return data.account;
  } catch (error) {
    console.error('Failed to fetch user NFTs', error);
    throw error;
  }
};

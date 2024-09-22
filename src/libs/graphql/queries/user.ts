import { gql } from '@apollo/client/core';

export const GET_USER_BADGES = gql`
  query UserBadges($address: ID!) {
    account(id: $address) {
      id
      s1Badges {
        id
        badgeId
      }
    }
  }
`;

export const USER_NFTS_QUERY = gql`
  query UserNfts($address: ID!) {
    account(id: $address) {
      id
      totalMultiplier
      taikoonsMultiplier
      snaefellMultiplier
      badgesMultiplier
      s1MultiplierNfts {
        contract
        id
        tokenId
        badgeId
        uri
      }
    }
  }
`;

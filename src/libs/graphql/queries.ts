import { gql } from '@apollo/client/core';

export const USER_NFTS_QUERY = gql`
  query UserNfts($address: String) {
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

import { gql } from '@apollo/client/core';

export const USER_NFTS_QUERY = gql`
  query UserNfts($address: String) {
    owner(id: $address) {
      id
      totalMultiplier
      factionMultiplier
      snaefellMultiplier
      taikoonMultiplier
      ownedTokens {
        contract {
          name
        }
        id
        tokenId
        badgeId
        uri
      }
    }
  }
`;

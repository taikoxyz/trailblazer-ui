import { gql } from '@apollo/client/core';

export const GET_MIGRATION_STATUS_GQL = gql`
  query getMigrationStatus($address: Bytes) {
    account(id: $address) {
      id
      approvedForAll
      approvedS1Tokens {
        id
        badgeId
      }
      s2Migrations {
        id
        isStarted
        isCompleted
        pinkTampers
        purpleTampers
        claimExpirationTimeout
        tamperExpirationTimeout
        s1Badge {
          id
          badgeId
          contract
          owner {
            id
          }
          tokenId
        }
      }
    }
  }
`;

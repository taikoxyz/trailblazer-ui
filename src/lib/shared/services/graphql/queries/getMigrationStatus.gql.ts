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
        devTampers
        whaleTampers
        minnowTampers
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
        s2Badge {
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

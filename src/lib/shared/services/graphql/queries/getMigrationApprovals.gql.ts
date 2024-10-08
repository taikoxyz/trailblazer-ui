import { gql } from '@apollo/client/core';

export const GET_MIGRATION_APPROVALS_GQL = gql`
  query getMigrationApprovals($address: Bytes) {
    account(id: $address) {
      id
      approvedForAll
      approvedS1Tokens {
        id
        badgeId
      }
    }
  }
`;

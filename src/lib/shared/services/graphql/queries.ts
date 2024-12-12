import { gql } from '@apollo/client/core';

export const USER_NFTS_QUERY = gql`
  query UserNfts($address: Bytes) {
    account(id: $address) {
      id
      totalMultiplier
      s1MultiplierNfts {
        contract
        id
        tokenId
        badgeId
      }
    }
  }
`;

export const USER_BADGES_S1_QUERY = gql`
  query UserBadges($address: Bytes) {
    account(id: $address) {
      id
      s1MultiplierNfts {
        id
        badgeId
        tokenId
      }
    }
  }
`;

export const USER_PROFILE_PICTURE_QUERY = gql`
  query PfpTokenURI($address: String) {
    profilePicture(id: $address) {
      id
      tokenAddress
      tokenId
      tokenURI
    }
  }
`;

export const USER_PROFILE_PICTURES_QUERY = gql`
  query PfpTokenURI($address: String) {
    profilePictures(id: $address) {
      id
      tokenAddress
      tokenId
      tokenURI
    }
  }
`;

export const USER_NFTS_FETCH_QUERY = gql`
  query UserBadges($address: Bytes) {
    tokens(orderBy: id, first: 1000, where: { owner: $address }) {
      id
      erc
      tokenId
      contract
      badgeId
      movement
      season
      uri
      frozen
    }
  }
`;

export const FETCH_ENABLED_MIGRATIONS_QUERY = gql`
  query OpenRecruitments($address: String) {
    openRecruitments(where: { enabled: true }) {
      id
      enabled
      badgeIds
      startTime
      endTime
    }
  }
`;

export const GET_MIGRATION_STATUS_QUERY = gql`
  query getRecruitmentStatus($address: Bytes, $cycleId: Int) {
    account(id: $address) {
      id
      approvedForAll
      approvedS1Tokens {
        id
        badgeId
      }
      s2Recruitments(cycleId: $cycleId) {
        id
        cycleId
        isStarted
        isCompleted
        whaleInfluences
        minnowInfluences
        claimExpirationTimeout
        influenceExpirationTimeout
        s1Badge {
          id
          badgeId
          movement
          contract
          owner {
            id
          }
          tokenId
        }
        s2Badge {
          id
          badgeId
          movement
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

export const GET_MIGRATION_APPROVALS_QUERY = gql`
  query getRecruitmentApprovals($address: Bytes) {
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

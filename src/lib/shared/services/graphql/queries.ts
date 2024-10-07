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

export const USER_BADGES_QUERY = gql`
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

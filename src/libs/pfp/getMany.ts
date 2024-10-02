import { gql } from '@apollo/client/core';
import axios from 'axios';
import { type Address } from 'viem';

import { graphqlClient } from '$lib/shared/services/graphql/client';
import { globalAxiosConfig } from '$libs/api/axiosConfig';

export async function getMany(addresses: Address[]): Promise<Record<Address, string>> {
  try {
    const out: Record<Address, string> = {};
    addresses.forEach((address) => {
      out[address] = '';
    });
    const query = gql`
      query PfpTokenURI($addresses: [String!]!) {
        profilePictures(where: { user_in: $addresses }) {
          user
          tokenAddress
          tokenId
          tokenURI
        }
      }
    `;

    const result = await graphqlClient.query({
      query,
      variables: { addresses: addresses },
    });

    if (!result.data.profilePictures) {
      throw new Error('GraphQL: No profile picture found');
    }

    for (const item of result.data.profilePictures) {
      const { tokenURI, owner } = item;

      const tokenUriUrl = `/api/proxy?url=${encodeURIComponent(tokenURI)}`;
      const src = await axios.get(tokenUriUrl, globalAxiosConfig);
      out[owner] = src.data.image;
    }
    return out;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.warn(e);
    return {};
  }
}

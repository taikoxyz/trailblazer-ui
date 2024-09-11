import { gql } from '@apollo/client/core';
import axios from 'axios';
import { type Address } from 'viem';

import { globalAxiosConfig } from '$libs/api/axiosConfig';
import { badgesSubGraph } from '$libs/badges/badgesSubGraph';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

export async function get(address: Address): Promise<string> {
  try {
    const query = gql`
      query PfpTokenURI($address: String) {
        profilePicture(id: $address) {
          tokenURI
        }
      }
    `;

    const result = await badgesSubGraph.query({
      query,
      variables: { address: address.toLocaleLowerCase() },
    });

    if (!result.data.profilePicture) {
      throw new Error('GraphQL: No profile picture found');
    }

    const { tokenURI } = result.data.profilePicture;

    const tokenUriUrl = isDevelopmentEnv ? `/api/proxy?url=${encodeURIComponent(tokenURI)}` : tokenURI;
    const src = await axios.get(tokenUriUrl, globalAxiosConfig);
    return src.data.image;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.warn(e);
    return '';
  }
}

import axios from 'axios';
import type { Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { globalAxiosConfig } from '$libs/api/axiosConfig';

import type { ITokenClaimPreflight } from './types';

export default async function preflight(address: Address): Promise<ITokenClaimPreflight> {
  const url = `${PUBLIC_TRAILBLAZER_API_URL}/claim/proof`;
  const res = await axios.get(url, {
    params: {
      address: address,
    },
    ...globalAxiosConfig,
  });

  const { value, proof } = res.data;

  return { address, value: parseFloat(value || '0'), proof };
}

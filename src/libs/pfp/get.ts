import { readContract } from '@wagmi/core';
import axios from 'axios';
import { type Address } from 'viem';

import { globalAxiosConfig } from '$libs/api/axiosConfig';
import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';

import { registerProfilePictureAbi, registerProfilePictureAddress } from '../../generated/abi';

export async function get(address: Address): Promise<string> {
  try {
    const metadataUrl = await readContract(wagmiConfig, {
      abi: registerProfilePictureAbi,
      address: registerProfilePictureAddress[chainId],
      functionName: 'getProfilePicture',
      args: [address],
      chainId,
    });
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(metadataUrl)}`;
    const result = await axios.get(proxyUrl, globalAxiosConfig);

    return result.data.image;
  } catch (e) {
    console.warn(e);
    return '/avatar.png';
  }
}

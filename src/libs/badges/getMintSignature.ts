import { readContract, signMessage } from '@wagmi/core';
import axios from 'axios';
import { type Address } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { globalAxiosConfig } from '$libs/api/axiosConfig';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import type { IContractData } from '$types';

import { mockSignHash } from './getMockMintSignature';

async function signHash(
  config: typeof wagmiConfig,
  address: Address,
  badgeId: number,
  chainId: number,
): Promise<IContractData> {
  const challenge = Date.now().toString();
  const signature = await signMessage(config, { message: challenge });

  try {
    const res = await axios.post(
      `${PUBLIC_TRAILBLAZER_API_URL}/faction/mint`,
      {
        address,
        signature,
        message: challenge,
        badgeId,
        chainId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        ...globalAxiosConfig,
      },
    );

    const mintSignature = res.data;

    return `0x${mintSignature}`;
  } catch (error) {
    throw new Error(`Error in signHash: ${error}`);
  }
}

export default async function getMintSignature(
  address: Address,
  factionId: FACTIONS,
): Promise<{ signature: IContractData; hash: IContractData }> {
  const contractAddress = trailblazersBadgesAddress[chainId];

  const hash = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });

  // sign with the dev account instead of the API
  if (isDevelopmentEnv) {
    const signature = await mockSignHash(hash);
    return { signature, hash };
  }
  const signature = await signHash(wagmiConfig, address, factionId, chainId);
  return { signature, hash };
}

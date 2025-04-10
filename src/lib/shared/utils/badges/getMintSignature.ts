import { readContract, signMessage } from '@wagmi/core';
import axios from 'axios';
import { type Address } from 'viem';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

import { getLogger } from '../logger';
import { mockSignHash } from './getMockMintSignature';

const log = getLogger('getMintSignature');

async function signHash(
  config: typeof wagmiConfig,
  address: Address,
  badgeId: number,
  chainId: number,
): Promise<Address> {
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
  factionId: number,
): Promise<{ signature: Address; hash: Address }> {
  const contractAddress = trailblazersBadgesAddress[chainId];

  log('getMintSignature', { address, factionId, contractAddress });
  const hash = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });
  log('getMintSignature hash', { hash });
  // sign with the dev account instead of the API
  if (isDevelopmentEnv) {
    const signature = await mockSignHash(hash);
    log('dev signature', { signature });
    return { signature, hash };
  }
  const signature = await signHash(wagmiConfig, address, factionId, chainId);
  log('getMintSignature signature', { signature });
  return { signature, hash };
}

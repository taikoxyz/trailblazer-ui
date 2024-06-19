import { ecsign } from '@ethereumjs/util';
import { concatSig } from '@metamask/eth-sig-util';
import { readContract, signMessage } from '@wagmi/core';
import { type Address } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { PUBLIC_ENV } from '$env/static/public';
import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId, IContractData, IToDo } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

async function signHash(
  config: typeof wagmiConfig,
  address: Address,
  badgeId: number,
  chainId: number,
): Promise<IContractData> {
  const challenge = Date.now().toString();
  const signature = await signMessage(config, { message: challenge });

  const baseUrl = 'https://qa.trailblazer.taiko.xyz/mint';
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        signature,
        message: challenge,
        badgeId,
        chainId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch mint signature: ${res.statusText}`);
    }

    const mintSignature = await res.json();

    return `0x${mintSignature}`;
  } catch (error) {
    throw new Error(`Error in signHash: ${error}`);
  }
}
// this is a dev-only method
// it used hardhat account #0 for signing
// signatures are not valid on mainnet deployment
export async function mockSignHash(hash: string): Promise<IContractData> {
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const sig = ecsign(
    Buffer.from(hash.slice(2), 'hex'),
    Buffer.from(privateKey.slice(2), 'hex')) as IToDo
  const serialized = concatSig(
    Buffer.from(sig.v.toString(16), 'hex'),
    sig.r,
    sig.s
);
  return serialized as IContractData;
}

export default async function getMintSignature(
  address: Address,
  factionId: FACTIONS,
): Promise<{ signature: IContractData; hash: IContractData }> {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return { signature: '0x0', hash: '0x0' };

  const chainId = selectedNetworkId as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];

  const hash = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });

  // sign with the dev account instead of the API
  if (PUBLIC_ENV === 'development') {
    const signature = await mockSignHash(hash);
    return { signature, hash };
  }
  const signature = await signHash(wagmiConfig, address, factionId, chainId);
  return { signature, hash };
}

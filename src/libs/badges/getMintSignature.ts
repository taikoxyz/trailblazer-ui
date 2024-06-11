import { readContract, signMessage } from '@wagmi/core';
import { type Address } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function signHash(config: any, address: Address, badgeId: number, chainId: number): Promise<IContractData> {
  const challenge = Date.now().toString();
  const signature = await signMessage(config, { message: challenge });

  //const baseUrl = config.chainId === 167000 ? '' : 'https://trailblazer.hekla.taiko.xyz/mint';
  const baseUrl = 'https://trailblazer.hekla.taiko.xyz/mint';

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

  const mintSignature = await res.json();

  return `0x${mintSignature}`;
}

export default async function getMintSignature(
  address: Address,
  factionId: FACTIONS,
): Promise<{ signature: IContractData; hash: IContractData }> {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return { signature: '0x0', hash: '0x0' };

  const chainId = selectedNetworkId as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];
  console.log({chainId})
  const hash = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });

  const signature = await signHash(wagmiConfig, address, factionId, chainId);
  return { signature, hash };
}

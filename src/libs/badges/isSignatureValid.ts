import { readContract } from '@wagmi/core';
import { type Address, recoverAddress } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';
import type { IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

export default async function isSignatureValid(signature: IContractData, address: Address, factionId: FACTIONS) {
  const contractAddress = trailblazersBadgesAddress[chainId];

  const hash = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });

  const mintSigner = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'mintSigner',
    chainId,
  });
  const localSigner = await recoverAddress({ hash, signature });

  return mintSigner.toLocaleLowerCase() === localSigner.toLocaleLowerCase();
}

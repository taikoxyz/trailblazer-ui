import { readContract } from '@wagmi/core';
import { type Address, recoverAddress } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '$generated/abi';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import type { IContractData } from '$types';

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

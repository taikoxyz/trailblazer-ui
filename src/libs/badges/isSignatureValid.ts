import { readContract } from '@wagmi/core';
import { type Address, recoverAddress } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

export default async function isSignatureValid(signature: IContractData, address: Address, factionId: FACTIONS) {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return '0x0';

  const chainId = selectedNetworkId as IChainId;
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

  console.log({ mintSigner, localSigner });

  return mintSigner.toLocaleLowerCase() === localSigner.toLocaleLowerCase();
}

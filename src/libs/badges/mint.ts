import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import isSignatureValid from './isSignatureValid';

export default async function mint(address: Address, factionId: FACTIONS, signature: IContractData) {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return;

  const chainId = selectedNetworkId as IChainId;

  const signatureValid = await isSignatureValid(signature, address, factionId);

  if (!signatureValid) {
    throw new Error('Invalid signature');
  }

  // ensure locally that the signature is valid before calling metamask
  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'mint',
    args: [signature, BigInt(factionId)],
    chainId: chainId as number,
  });
  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });
  return receipt;
}

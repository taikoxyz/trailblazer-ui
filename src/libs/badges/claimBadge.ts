import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { type Address, decodeEventLog } from 'viem';

import { type FactionNames, FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { config } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';
import isSignatureValid from './isSignatureValid';

export default async function claimBadge(address: Address, factionId: FACTIONS, signature: IContractData) {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return;

  const chainId = selectedNetworkId as IChainId;

  const signatureValid = await isSignatureValid(signature, address, factionId);

  if (!signatureValid) {
    throw new Error('Invalid signature');
  }

  // ensure locally that the signature is valid before calling metamask
  const tx = await writeContract(config, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'mint',
    args: [signature, BigInt(factionId)],
    chainId: chainId as number,
  });

  console.log(tx);
}

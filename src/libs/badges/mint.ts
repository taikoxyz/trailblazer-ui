import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { FACTIONS } from '$configs/badges';
import { chainId } from '$libs/chain';
import calculateGasPrice from '$libs/util/calculateGasPrice';
import { wagmiConfig } from '$libs/wagmi';
import type { IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import isSignatureValid from './isSignatureValid';

export default async function mint(address: Address, factionId: FACTIONS, signature: IContractData) {
  // ensure locally that the signature is valid before calling metamask
  const signatureValid = await isSignatureValid(signature, address, factionId);

  if (!signatureValid) {
    throw new Error('Invalid signature');
  }

  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'mint',
    args: [signature, BigInt(factionId)],
    chainId: chainId as number,
    gasPrice: await calculateGasPrice(),
  });
  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });
  return receipt;
}

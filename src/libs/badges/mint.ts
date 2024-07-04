import { getTransaction, writeContract } from '@wagmi/core';
import { type Address } from 'viem';

import { FACTIONS } from '$configs/badges';
import { chainId } from '$libs/chain';
import { wagmiConfig } from '$libs/wagmi';
import { pendingTransactions } from '$stores/pendingTransactions';
import type { IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';
import { canMint } from './canMint';
import isSignatureValid from './isSignatureValid';

export default async function mint(address: Address, factionId: FACTIONS, signature: IContractData): Promise<string> {
  // ensure locally that the signature is valid before calling metamask
  const signatureValid = await isSignatureValid(signature, address, factionId);

  if (!signatureValid) {
    throw new Error('Invalid signature');
  }
  const previousTxStorageKey = 'trailblazersBadgesMintTx';
  const previousTxHash = localStorage.getItem(previousTxStorageKey);

  if (previousTxHash) {
    const { blockHash } = await getTransaction(wagmiConfig, {
      hash: previousTxHash as Address,
    });

    if (!blockHash) {
      throw new Error('Previous claim transaction is still pending');
    } else {
      localStorage.removeItem(previousTxStorageKey);

      // if not minting anymore, resolve!
      const isMinting = await canMint(signature, address, factionId);
      if (!isMinting) {
        return previousTxHash;
      }
    }
  }

  const tx = await writeContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: trailblazersBadgesAddress[chainId],
    functionName: 'mint',
    args: [signature, BigInt(factionId)],
    chainId,
  });
  await pendingTransactions.add(tx);

  return tx;
}

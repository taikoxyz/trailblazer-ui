import { ecsign } from '@ethereumjs/util';
import { concatSig } from '@metamask/eth-sig-util';
import { readContract } from '@wagmi/core';
import { type Address } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { config } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

// mock signature function
// TODO: export to api endpoint
async function signHash(hash: string): Promise<IContractData> {
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const sig = ecsign(Buffer.from(hash.slice(2), 'hex'), Buffer.from(privateKey.slice(2), 'hex'));
  const serialized = concatSig(Buffer.from(sig.v.toString(16), 'hex'), sig.r, sig.s);
  return serialized as IContractData;
}

export default async function getMintSignature(address: Address, factionId: FACTIONS): Promise<IContractData> {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return '0x0';

  const chainId = selectedNetworkId as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];

  const hash = await readContract(config, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });

  const signature = await signHash(hash);

  return signature;
}

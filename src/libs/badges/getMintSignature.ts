import { ecsign } from '@ethereumjs/util';
import { concatSig } from '@metamask/eth-sig-util';
import { readContract, signMessage } from '@wagmi/core';
import { type Address } from 'viem';

import type { FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { config } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

// mock signature function
// TODO: export to api endpoint
export async function mockSignHash(hash: string): Promise<IContractData> {
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const sig = ecsign(Buffer.from(hash.slice(2), 'hex'), Buffer.from(privateKey.slice(2), 'hex'));
  const serialized = concatSig(Buffer.from(sig.v.toString(16), 'hex'), sig.r, sig.s);
  return serialized as IContractData;
}

async function signHash(config: any, address: Address, badgeId: number): Promise<IContractData> {
  const challenge = Date.now().toString();
  const signature = await signMessage(config, { message: challenge });
  const res = await fetch('https://trailblazer.hekla.taiko.xyz/mint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      signature,
      message: challenge,
      badgeId,
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

  const hash = await readContract(config, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'getHash',
    args: [address, BigInt(factionId)],
    chainId,
  });

  const signature = await signHash(config, address, factionId);

  return { signature, hash };
}

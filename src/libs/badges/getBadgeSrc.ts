import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { type FactionNames, FACTIONS } from '$configs/badges';
import { web3modal } from '$libs/connect';
import { wagmiConfig } from '$libs/wagmi';
import type { IChainId, IContractData } from '$types';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';
import { getTokenId } from './getTokenId';

export default async function getBadgeSrc(owner: Address, badge: FactionNames) {
  const { selectedNetworkId } = web3modal.getState();
  if (!selectedNetworkId) return false;

  const chainId = selectedNetworkId as IChainId;
  const contractAddress = trailblazersBadgesAddress[chainId];

  const tokenId = await getTokenId(owner, FACTIONS[badge]);

  const result = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
    chainId,
  });

  console.log({ owner, badge, result });

  const url = ['https://nftstorage.link/ipfs/', result];

  return url.join('');
}

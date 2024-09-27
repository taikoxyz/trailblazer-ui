import { readContract } from '@wagmi/core';
import type { Address } from 'viem';

import { type FactionNames, FACTIONS } from '$configs/badges';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi/';
import { getTokenId } from './getTokenId';

export default async function getBadgeSrc(owner: Address, badge: FactionNames) {
  const contractAddress = trailblazersBadgesAddress[chainId];

  const tokenId = await getTokenId(owner, FACTIONS[badge]);

  const result = await readContract(wagmiConfig, {
    abi: trailblazersBadgesAbi,
    address: contractAddress,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
    chainId,
  });

  const url = ['https://nftstorage.link/ipfs/', result];

  return url.join('');
}

import { type Address } from 'viem';

import { Movements } from '$lib/domains/profile/types/types';
import { type NFT, TokenType } from '$shared/types/NFT';

import generateBadgeMetadata from './generateBadgeMetadata';

export default function getMockBadge(contract: Address, badgeId: number, movement?: Movements): NFT {
  const badge = {
    tokenId: -1,
    tokenUri: '',
    address: contract,
    metadata: {
      erc: TokenType.Unknown,
      ...generateBadgeMetadata(badgeId, movement),
    },
  } satisfies NFT;

  return badge;
}

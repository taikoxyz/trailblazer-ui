import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
import { Movements, Seasons } from '$lib/domains/profile/types/types';
import { type NFT, TokenType } from '$shared/types/NFT';

import { chainId } from '../chain';
import generateBadgeMetadata from './generateBadgeMetadata';

export default function getMockBadge(season: Seasons, badgeId: number, movement?: Movements): NFT {
  const contract =
    season === Seasons.Season1 ? trailblazersBadgesAddress[chainId] : trailblazersBadgesS2Address[chainId];

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

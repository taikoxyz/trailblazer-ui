import { type Address, isAddressEqual } from 'viem';

import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
import { Seasons } from '$lib/domains/profile/types/types';
import type { NFT } from '$shared/types/NFT';

import { chainId } from '../chain';

export default function filterBadges(season: Seasons, badges: NFT[]): NFT[] {
  let contract = '';
  if (season === Seasons.Season1) {
    contract = trailblazersBadgesAddress[chainId];
  } else if (season === Seasons.Season2) {
    contract = trailblazersBadgesS2Address[chainId];
  } else {
    throw new Error('Invalid season');
  }

  return badges
    .filter((nft) => isAddressEqual(nft.address, contract as Address))
    .sort((a, b) => {
      const _a = a.metadata?.badgeId || 0;
      const _b = b.metadata?.badgeId || 0;
      if (_a < _b) return -1;
      if (_a > _b) return 1;
      return 0;
    });
}

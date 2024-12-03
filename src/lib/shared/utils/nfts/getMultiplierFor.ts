import { isAddressEqual } from 'viem';

import { taikoonTokenAddress, trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
import { Movements, Seasons } from '$lib/domains/profile/types/types';
import type { NFT } from '$shared/types/NFT';

import { chainId } from '../chain';

export default function getMultiplierFor(token: NFT): {
  multiplier: number;
  tooltip: string;
} {
  if (isAddressEqual(token.address, taikoonTokenAddress[chainId])) {
    // Taikoon
    return {
      multiplier: 1,
      tooltip: 'Applied globally',
    };
  }

  if (isAddressEqual(token.address, trailblazersBadgesAddress[chainId]) || token.metadata.season === Seasons.Season1) {
    // Trailblazers Badges, season 1
    return {
      multiplier: 0.05,
      tooltip: 'Applied globally',
    };
  }

  if (
    isAddressEqual(token.address, trailblazersBadgesS2Address[chainId]) ||
    token.metadata.season === Seasons.Season2
  ) {
    // Trailblazers Badges, season 2
    const movement = token.metadata.movement as Movements;
    return {
      multiplier: 0.05,
      tooltip: movement === Movements.Minnow ? 'Transaction Count XP' : 'Transaction Value XP',
    };
  }

  // Default (Snaefell)
  return {
    multiplier: 0.1,
    tooltip: 'Applied globally',
  };
}

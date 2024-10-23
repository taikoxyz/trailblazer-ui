import { type Address, isAddressEqual } from 'viem';

import { FACTIONS } from '$configs/badges';
import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
import { BadgeAdapter } from '$lib/domains/nfts/adapter/BadgeAdapter';
import { FactionNames } from '$lib/domains/nfts/types/badges/types';
import { MovementNames, Movements } from '$lib/domains/profile/types/types';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('BadgeService');

export class BadgeService {
  private adapter: BadgeAdapter;

  constructor(adapter?: BadgeAdapter) {
    this.adapter = adapter || new BadgeAdapter();
  }

  async fetchAllNFTsForUser(address: Address): Promise<NFT[]> {
    const dryTokens = await this.adapter.fetchAllNFTsForUser(address);
    log('fetchAllNFTsForUser', { address, dryTokens });
    const tokens = dryTokens.map((token) => {
      if (
        token.badgeId === undefined ||
        token.badgeId === null ||
        (!isAddressEqual(token.address, trailblazersBadgesAddress[chainId]) &&
          !isAddressEqual(token.address, trailblazersBadgesS2Address[chainId]))
      ) {
        return token;
      }

      if (token.movement === undefined || token.movement === null) {
        token.movement = Movements.Dev;
      }

      return {
        ...token,
        src: this.getBadgeURI(token.badgeId, token.movement),
      };
    });

    return tokens;
  }

  private getBadgeURI(badgeId: number, movement: Movements): string {
    const movementStr = MovementNames[movement].toLowerCase();
    const factionStr = FactionNames[FACTIONS[badgeId] as FactionNames].toLowerCase();

    return `/factions/${factionStr}/${movementStr}.png`;
  }

  getTokenId(address: Address, badgeId: number): Promise<number> {
    return this.adapter.getTokenId(address, badgeId);
  }
}

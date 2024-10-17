import type { Address } from 'viem';

import { trailblazersBadgesAddress } from '$generated/abi';
import { BadgeAdapter } from '$lib/domains/nfts/adapter/BadgeAdapter';
import type { FactionNames } from '$lib/domains/nfts/types/badges/types';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('BadgeService');

export class BadgeService {
  private adapter: BadgeAdapter;

  constructor(adapter?: BadgeAdapter) {
    this.adapter = adapter || new BadgeAdapter();
  }

  async getBadgesForUser(address: Address): Promise<NFT[]> {
    log('getBadgesForUser', { address });
    const balances = await this.adapter.fetchUserS1Badges(address);

    const badges: NFT[] = [];

    const badgePromises = Object.keys(balances).map(async (badgeName, index) => {
      const badge = balances[badgeName as FactionNames];
      if (badge && badge.badgeId !== null && badge.tokenId !== null) {
        return {
          address: trailblazersBadgesAddress[chainId],
          src: this.getS1BadgeURI(index),
          tokenUri: '',
          tokenId: badge.tokenId,
          badgeId: badge.badgeId,
        } satisfies NFT;
      }
      return null;
    });

    const resolvedBadges = await Promise.all(badgePromises);
    const filteredBadges = resolvedBadges.filter((badge) => badge !== null) as NFT[];
    badges.push(...filteredBadges);

    log('getBadgesForUser result', { badges });
    return badges;
  }

  private getS1BadgeURI(badgeId: number): string {
    const s1Badges = [
      '/factions/ravers/dev.png',
      '/factions/robots/dev.png',
      '/factions/bouncers/dev.png',
      '/factions/masters/dev.png',
      '/factions/monks/dev.png',
      '/factions/androids/dev.png',
      '/factions/drummers/dev.png',
      '/factions/shinto/dev.png',
    ];
    return s1Badges[badgeId];
  }

  getTokenId(address: Address, badgeId: number): Promise<number> {
    return this.adapter.getTokenId(address, badgeId);
  }
}

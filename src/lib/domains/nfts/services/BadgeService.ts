import type { Address } from 'viem';

import { trailblazersBadgesAddress } from '$generated/abi';
import type { NFT } from '$lib/shared/types/NFT';
import { chainId } from '$lib/shared/utils/chain';
import { getLogger } from '$libs/util/logger';

import { BadgeAdapter } from '../adapter/BadgeAdapter';
import type { FactionNames } from '../types/badges/types';

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
      if (badge && badge.badgeId && badge.tokenId) {
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
      '/factions/ravers/neutral.png',
      '/factions/robots/neutral.png',
      '/factions/bouncers/neutral.png',
      '/factions/masters/neutral.png',
      '/factions/monks/neutral.png',
      '/factions/androids/neutral.png',
      '/factions/drummers/neutral.png',
      '/factions/shinto/neutral.png',
    ];
    return s1Badges[badgeId];
  }
}

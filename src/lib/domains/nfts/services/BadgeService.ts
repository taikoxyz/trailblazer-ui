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
    let badgeId = 0;

    for (const badgeName in balances) {
      if (balances[badgeName as FactionNames]) {
        const tokenId = await this.adapter.getTokenId(address, badgeId);
        badges.push({
          address: trailblazersBadgesAddress[chainId],
          src: this.getS1BadgeURI(badgeId),
          tokenUri: '',
          tokenId,
          badgeId,
        } satisfies NFT);
      }
      badgeId += 1;
    }

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

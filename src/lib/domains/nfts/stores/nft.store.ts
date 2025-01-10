import { writable } from 'svelte/store';
import { zeroAddress } from 'viem';

import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
import type { BadgeDetailsByMovement } from '$shared/types/NFT';
import getConnectedAddress from '$shared/utils/getConnectedAddress';

export const badgeStore = writable<BadgeDetailsByMovement | null>(null);

export async function fetchBadges() {
  try {
    const address = getConnectedAddress();
    if (address !== zeroAddress) {
      const badges = await nftService.fetchBadgesForUser(address);
      badgeStore.set(badges);
    } else {
      badgeStore.set(null);
    }
  } catch (error) {
    console.error('Error fetching badges:', error);
    badgeStore.set(null);
  }
}

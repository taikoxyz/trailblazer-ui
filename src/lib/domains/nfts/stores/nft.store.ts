import { writable } from 'svelte/store';

import type { BadgeDetailsByMovement, NFT } from '$shared/types/NFT';

export const badgeStore = writable<BadgeDetailsByMovement | null>(null);
export const taikoonStore = writable<NFT[]>([]);
export const snaefellStore = writable<NFT | null>(null);

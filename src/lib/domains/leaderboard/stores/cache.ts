import { get, writable } from 'svelte/store';
import { type Address, getAddress } from 'viem';

import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';
import type { NFT } from '$lib/shared/types/NFT';

import type { ProtocolCacheEntry } from '../types/competition/types';

const ONE_HOUR_MS = 60 * 60 * 1000;

function createProtocolDetailsStore() {
  const store = writable<Map<string, ProtocolCacheEntry>>(new Map());

  return {
    subscribe: store.subscribe,
    get: (protocolSlug: string, season: number, type: string): ProtocolApiResponse | undefined => {
      const cacheKey = `${type}_${protocolSlug}_${season}`;
      const cache = get(store);
      const entry = cache.get(cacheKey);
      if (!entry) return undefined;
      if (Date.now() - entry.timestamp > ONE_HOUR_MS) {
        // Expire this entry
        cache.delete(cacheKey);
        store.set(cache);
        return undefined;
      }
      return entry.data;
    },
    set: (protocolSlug: string, season: number, type: string, data: ProtocolApiResponse): void => {
      const cacheKey = `${type}_${protocolSlug}_${season}`;
      store.update((cache) => {
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return cache;
      });
    },
  };
}

export const protocolDetailsCache = createProtocolDetailsStore();

type ProfilePictureEntry = NFT | null;
type MultipleProfilePictureEntry = Record<string, ProfilePictureEntry>;

function createProfilePictureCacheStore() {
  // Single profile picture cache
  const singleCache = writable<Map<string, ProfilePictureEntry>>(new Map());

  // Multiple profile pictures cache
  const multipleCache = writable<Map<string, MultipleProfilePictureEntry>>(new Map());

  return {
    subscribeSingle: singleCache.subscribe,
    getSingle: (address: Address): ProfilePictureEntry | undefined => {
      const checksummedAddress = getAddress(address);
      const cache = get(singleCache);
      return cache.get(checksummedAddress);
    },
    setSingle: (address: Address, data: ProfilePictureEntry): void => {
      const checksummedAddress = getAddress(address);
      singleCache.update((cache) => {
        cache.set(checksummedAddress, data);
        return cache;
      });
    },
    subscribeMultiple: multipleCache.subscribe,
    getMultiple: (addresses: Address[]): MultipleProfilePictureEntry | undefined => {
      const normalizedAddresses = addresses.map((addr) => getAddress(addr)).sort();
      const cacheKey = normalizedAddresses.join(',');
      const cache = get(multipleCache);
      return cache.get(cacheKey);
    },
    setMultiple: (addresses: Address[], data: MultipleProfilePictureEntry): void => {
      const normalizedAddresses = addresses.map((addr) => getAddress(addr)).sort();
      const cacheKey = normalizedAddresses.join(',');
      multipleCache.update((cache) => {
        cache.set(cacheKey, data);
        return cache;
      });
    },
    // Add the clear method to reset the cache
    clear: (): void => {
      singleCache.set(new Map());
      multipleCache.set(new Map());
    },
  };
}

/**
 * Exported cache stores for single and multiple profile pictures.
 */
export const profilePictureCache = createProfilePictureCacheStore();

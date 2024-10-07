import { get, writable } from 'svelte/store';
import { type Address, getAddress } from 'viem';

import type { NFT } from '$lib/shared/types/NFT';

import type { ProtocolApiResponse } from '../dto/protocol.dto';

function createProtocolDetailsStore() {
  const store = writable<Map<string, ProtocolApiResponse>>(new Map());

  return {
    subscribe: store.subscribe,
    get: (protocolSlug: string, season: number): ProtocolApiResponse | undefined => {
      const cacheKey = `${protocolSlug}_${season}`;
      const cache = get(store);
      return cache.get(cacheKey);
    },
    set: (protocolSlug: string, season: number, data: ProtocolApiResponse): void => {
      store.update((cache) => {
        const cacheKey = `${protocolSlug}_${season}`;
        cache.set(cacheKey, data);
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

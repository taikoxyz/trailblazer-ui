import { get, writable } from 'svelte/store';

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

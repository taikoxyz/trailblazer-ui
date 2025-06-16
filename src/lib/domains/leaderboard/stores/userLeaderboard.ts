import { writable } from 'svelte/store';

import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { UserLeaderboardPage } from '$lib/domains/leaderboard/types/user/types';
import { getLogger } from '$shared/utils/logger';

const log = getLogger('UserLeaderboardStore');

// Create season-specific stores to prevent cross-contamination
const seasonStores = new Map<number, ReturnType<typeof writable<UserLeaderboardPage>>>();
const seasonUserEntryStores = new Map<number, ReturnType<typeof writable<UnifiedLeaderboardRow | null>>>();

function getOrCreateSeasonStore(season: number) {
  if (!seasonStores.has(season)) {
    log('Creating new season store for season', season);
    seasonStores.set(
      season,
      writable<UserLeaderboardPage>({
        items: [],
        lastUpdated: Date.now(),
        pagination: { page: 1, size: 10, total: 0 },
      }),
    );
  }
  return seasonStores.get(season)!;
}

function getOrCreateSeasonUserEntryStore(season: number) {
  if (!seasonUserEntryStores.has(season)) {
    log('Creating new season user entry store for season', season);
    seasonUserEntryStores.set(season, writable<UnifiedLeaderboardRow | null>(null));
  }
  return seasonUserEntryStores.get(season)!;
}

// Main leaderboard store that gets updated based on current season
export const currentUserLeaderboard = writable<UserLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

export const currentUserLeaderboardUserEntry = writable<UnifiedLeaderboardRow | null>(null);

// Helper functions to clear stores for specific seasons
export function clearUserLeaderboardStore(season: number) {
  log('Clearing user leaderboard store for season', season);
  const store = getOrCreateSeasonStore(season);
  store.set({
    items: [],
    lastUpdated: Date.now(),
    pagination: { page: 1, size: 10, total: 0 },
  });

  const userEntryStore = getOrCreateSeasonUserEntryStore(season);
  userEntryStore.set(null);

  // Also clear the main stores
  currentUserLeaderboard.set({
    items: [],
    lastUpdated: Date.now(),
    pagination: { page: 1, size: 10, total: 0 },
  });
  currentUserLeaderboardUserEntry.set(null);
}

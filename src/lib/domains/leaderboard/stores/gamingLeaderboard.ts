import { writable } from 'svelte/store';

import type { GamingLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';

export const currentGamingLeaderboard = writable<GamingLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

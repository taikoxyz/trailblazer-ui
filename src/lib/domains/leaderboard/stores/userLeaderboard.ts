import { writable } from 'svelte/store';

import type { UserLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';

export const currentUserLeaderboard = writable<UserLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

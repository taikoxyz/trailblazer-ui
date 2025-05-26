import { writable } from 'svelte/store';

import type { BasedlinerLeaderboardPage } from '../types';

export const leaderboardStore = writable<BasedlinerLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: { page: 0, size: 10, total: 0 },
});

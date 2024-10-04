import { writable } from 'svelte/store';

import type { DappLeaderboardPage } from '../types/dapps/types';

export const currentDappLeaderboard = writable<DappLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

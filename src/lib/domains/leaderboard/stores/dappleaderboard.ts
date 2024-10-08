import { writable } from 'svelte/store';

import type { DappLeaderboardPage } from '../types/dapps/types';

const currentDappLeaderboard = writable<DappLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

export default currentDappLeaderboard;

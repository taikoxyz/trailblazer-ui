import { writable } from 'svelte/store';

import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';

const currentDappCompetitionLeaderboard = writable<DappLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

export default currentDappCompetitionLeaderboard;

export const leaderboardLoading = writable<boolean>(false);

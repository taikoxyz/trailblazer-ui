import { writable } from 'svelte/store';

import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

import type { CexCompetitionPage } from '../types/cex/types';

export const currentCexCompetitionLeaderboard = writable<CexCompetitionPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

export const currentCexCompetitionLeaderboardUserEntry = writable<UnifiedLeaderboardRow | null>(null);

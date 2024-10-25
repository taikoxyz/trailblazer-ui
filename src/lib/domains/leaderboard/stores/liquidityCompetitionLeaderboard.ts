import { writable } from 'svelte/store';

import type { LiquidityCompetitionPage } from '$lib/domains/leaderboard/types/liquidity/types';

export const currentLiquidityCompetitionLeaderboard = writable<LiquidityCompetitionPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

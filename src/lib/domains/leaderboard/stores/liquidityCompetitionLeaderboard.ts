import { writable } from 'svelte/store';

import type { LiquidityCompetitionPage } from '$lib/domains/leaderboard/types/liquidity/types';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';

export const currentLiquidityCompetitionLeaderboard = writable<LiquidityCompetitionPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: {
    page: 1,
    size: 10,
    total: 0,
  },
});

export const currentLiquidityCompetitionLeaderboardUserEntry = writable<UnifiedLeaderboardRow | null>(null);

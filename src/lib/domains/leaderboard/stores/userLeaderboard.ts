import { writable } from 'svelte/store';

import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import type { UserLeaderboardPage } from '$lib/domains/leaderboard/types/user/types';

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

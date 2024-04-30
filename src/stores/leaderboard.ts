// tokenInfoStore.ts
import { writable } from 'svelte/store';

import type { LeaderboardPage } from '$libs/leaderboard/types';

export const currentLeaderboard = writable<LeaderboardPage>({
  items: [],
  page: 0,
  size: 20,
  max_page: 0,
  total_pages: 0,
  total: 0,
  last: 1,
  first: 0,
  visible: 0
});

import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import { getLogger } from '$shared/utils/logger';

import type { CexCompetitionPage, CexCompetitionType } from '../types/cex/types';

const log = getLogger('dappLeaderboardStore');

export const cexLeaderboardStore = writable<CexCompetitionPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: { page: 0, size: 10, total: 0 },
});

export async function fetchLeaderboard(page: number, type: CexCompetitionType, edition: number): Promise<void> {
  if (!browser) return;
  try {
    const url = `/api/competition/cex/${type}?page=${page}&edition=${edition}`;
    log('Fetching leaderboard from URL:', url);
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch leaderboard data: ${res.status} ${res.statusText} - ${errorText}`);
    }
    const data = await res.json();
    cexLeaderboardStore.set(data);
  } catch (error) {
    console.error(error);
  }
}

export const competitionSlug = writable('');

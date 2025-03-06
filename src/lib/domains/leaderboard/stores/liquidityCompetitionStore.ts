import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
import { getLogger } from '$shared/utils/logger';

import type { LiquidityCompetitionType } from '../types/competition/types';

const log = getLogger('LeaderboardStore');

export const leaderboardStore = writable<DappLeaderboardPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: { page: 0, size: 10, total: 0 },
});

export async function fetchLeaderboard(
  page: number,
  type: LiquidityCompetitionType,
  edition: number,
  address?: string,
): Promise<void> {
  if (!browser) return;
  try {
    const url = `/api/competition/liquidity/${type}?page=${page}&edition=${edition}${address ? `&address=${address}` : ''}`;
    log('Fetching leaderboard from URL:', url);
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch leaderboard data: ${res.status} ${res.statusText} - ${errorText}`);
    }
    const data = await res.json();
    leaderboardStore.set(data);
  } catch (error) {
    console.error(error);
  }
}

export const competitionSlug = writable('');

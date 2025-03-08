import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import { getLogger } from '$shared/utils/logger';

import { LiquidityCompetitionType } from '../types/competition/types';
import type { LiquidityCompetitionPage } from '../types/liquidity/types';

const log = getLogger('LeaderboardStore');

export const activeLiquidityType = writable<LiquidityCompetitionType>(LiquidityCompetitionType.OG);

export const leaderboardStore = writable<LiquidityCompetitionPage>({
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
    const url = `/api/competition/liquidity?page=${page}&edition=${edition}&type=${type}${address ? `&address=${address}` : ''}`;
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

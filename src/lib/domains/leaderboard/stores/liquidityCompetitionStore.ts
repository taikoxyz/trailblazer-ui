import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import { getLogger } from '$shared/utils/logger';

import { LiquidityCompetitionType } from '../types/competition/types';
import type { LiquidityCompetitionPage } from '../types/liquidity/types';
import { currentLiquidityCompetitionLeaderboardUserEntry } from './liquidityCompetitionLeaderboard';

const log = getLogger('LeaderboardStore');

export const activeLiquidityType = writable<LiquidityCompetitionType>(LiquidityCompetitionType.OG);

// Create edition-specific stores to prevent cross-contamination
const editionStores = new Map<number, ReturnType<typeof writable<LiquidityCompetitionPage>>>();

function getOrCreateEditionStore(edition: number) {
  if (!editionStores.has(edition)) {
    const store = writable<LiquidityCompetitionPage>({
      items: [],
      lastUpdated: Date.now(),
      pagination: { page: 0, size: 10, total: 0 },
    });
    editionStores.set(edition, store);
  }
  return editionStores.get(edition)!;
}

// Main leaderboard store that gets updated based on current edition
export const leaderboardStore = writable<LiquidityCompetitionPage>({
  items: [],
  lastUpdated: Date.now(),
  pagination: { page: 0, size: 10, total: 0 },
});

// Keep track of API calls to prevent duplicates
const pendingCalls = new Set<string>();

export async function fetchLeaderboard(
  page: number,
  type: LiquidityCompetitionType,
  edition: number,
  address?: string,
): Promise<void> {
  if (!browser) return;

  // Create a unique key for this API call
  const callKey = `${page}-${type}-${edition}-${address || 'noaddress'}`;

  // Prevent duplicate calls
  if (pendingCalls.has(callKey)) {
    log('Skipping duplicate API call for:', callKey);
    return;
  }

  pendingCalls.add(callKey);

  try {
    const url = `/api/competition/liquidity?page=${page}&edition=${edition}&type=${type}${address ? `&address=${address}` : ''}`;
    const stack = new Error().stack;
    log(
      'CLIENT API CALL - Fetching leaderboard from URL:',
      url,
      { page, type, edition, address, callKey },
      'Call stack:',
      stack?.split('\n').slice(1, 4).join('\n'),
    );
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch leaderboard data: ${res.status} ${res.statusText} - ${errorText}`);
    }
    const data = await res.json();

    // Update both the main store and the edition-specific store
    leaderboardStore.set(data);
    const editionStore = getOrCreateEditionStore(edition);
    editionStore.set(data);

    log('Leaderboard data fetched successfully for edition', edition);
  } catch (error) {
    console.error('Error in fetchLeaderboard:', error);
  } finally {
    // Remove from pending calls after a short delay to allow for quick successive calls
    setTimeout(() => {
      pendingCalls.delete(callKey);
    }, 100);
  }
}

export async function fetchLeaderboardUserEntry(address: string, edition: number, season: number): Promise<void> {
  if (!browser) return;
  try {
    const url = `/api/competition/liquidity/user?address=${address}&edition=${edition}&season=${season}`;
    log('Fetching user leaderboard entry from URL:', url);
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch user leaderboard data: ${res.status} ${res.statusText} - ${errorText}`);
    }
    const data = await res.json();
    currentLiquidityCompetitionLeaderboardUserEntry.set(data);
    log('User row:', data);
  } catch (error) {
    console.error(error);
  }
}

export const competitionSlug = writable('');

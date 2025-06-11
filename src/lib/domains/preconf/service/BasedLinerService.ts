import { type Address, zeroAddress } from 'viem';

import { browser } from '$app/environment';
import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';
import getConnectedAddress from '$shared/utils/getConnectedAddress';
import { getLogger } from '$shared/utils/logger';

import { BasedLinerAdapter } from '../adapter/BasedLinerAdapter';
import type { BasedlinerLeaderboard } from '../dto/BasedlinerLeaderboard';
import type { InternalAPIPayload } from '../dto/InternalAPIPayload';
import { leaderboardStore } from '../stores/BasedlinerLeaderboardStore';
import { PRECONF_CAMPAIGN_PHASE, PRECONF_EVENT } from '../types';

const log = getLogger('BasedLinerService');
export class BasedLinerService {
  /**
   * Registers for a phase for a specific event.
   * @param eventId - The ID of the event.
   * @param phase - The phase to register.
   * @returns A promise that resolves to the response from the API.
   * @memberof BasedLinerService
   */
  static async registerPhase(eventId: number, phase: PRECONF_CAMPAIGN_PHASE) {
    // check if phase is open
    const isPhaseOpen = await BasedLinerAdapter.isPhaseOpen({ eventId, phaseId: phase });
    if (!isPhaseOpen) {
      throw new Error('Phase is not open');
    }
    // check if wallet is connected
    if (getConnectedAddress() === zeroAddress) {
      throw new Error('No wallet connected');
    }

    // 1. get the txHash
    const txHash = await BasedLinerAdapter.sendTx({ eventId, phaseId: phase });
    if (!txHash) {
      throw new Error('No txHash found');
    }
    // TODO: handle event ended, then assume an avg of n seconds and call with phaseEnded true

    const payload: InternalAPIPayload = {
      phase,
      wallet: getConnectedAddress(),
      txHash,
      phaseEnded: false,
    };

    // 2. Call the backend API with the payload
    const res = await fetch('/api/basedliner/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Error calling API:', res.status, res.statusText);

      // Handle timeout errors specifically
      if (res.status === 408) {
        throw new TransactionTimedOutError('Transaction timed out');
      }

      // Handle rate limiting errors specifically
      if (res.status === 429) {
        throw new TooManyRequestsError('Rate limit exceeded. Please wait before submitting again.');
      }

      throw new Error(`API call failed: ${res.status} ${res.statusText}`);
    }
    // 3. Parse the response and return it
    return await res.json();
  }

  /**
   * Checks if a specific campaign phase is open.
   * @param param0 - The event ID and phase to check.
   * @returns A promise that resolves to a boolean indicating if the phase is open.
   * @memberof BasedLinerService
   */
  static async isPhaseOpen({ eventId, phaseId }: { eventId: number; phaseId: PRECONF_CAMPAIGN_PHASE }) {
    return await BasedLinerAdapter.isPhaseOpen({ eventId, phaseId });
  }
  /**
   * Fetches the leaderboard for a specific event and phase.
   * @param param0 - The event ID and phase to fetch the leaderboard for.
   * @returns A promise that resolves to the leaderboard data.
   * @memberof BasedLinerService
   */
  static async fetchLeaderboard({ eventId, page }: { eventId: number; page: number }) {
    if (!browser) return;
    try {
      const res = await fetch(`/api/basedliner/leaderboard/entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, page }),
      });

      log('Response from BasedLinerService:', res);

      if (!res.ok) {
        console.error('Error calling API:', res.status, res.statusText);
        throw new Error(`API call failed: ${res.status} ${res.statusText}`);
      }
      // 3. Parse the response and return it
      const data = await res.json();
      log('Leaderboard data:', data);
      const leaderboardPage = {
        items: Array.isArray(data.entries) ? data.entries : [],
        lastUpdated: Date.now(),
        pagination: { page, size: data.entries?.length || 0, total: data.entries?.length || 0 },
      };

      // Map the leaderboard data to the UnifiedLeaderboardRow format
      const mappedItems = leaderboardPage.items.map((row: BasedlinerLeaderboard) => {
        const mappedRow = mapBasedlinerLeaderboardRow(row);
        return {
          ...mappedRow,
          phase1: (row.phase1 || 0) / 1000,
          phase2: (row.phase2 || 0) / 1000,
        };
      });

      leaderboardPage.items = mappedItems;

      leaderboardStore.set(leaderboardPage);
      return leaderboardPage;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return {
        items: [],
        lastUpdated: Date.now(),
        pagination: { page, size: 0, total: 0 },
      };
    }
  }

  /**
   * Fetches the leaderboard .
   * @param param0 - The event ID and address to fetch the leaderboard entry for.
   * @returns A promise that resolves to the leaderboard entry data.
   * @memberof BasedLinerService
   */
  static async fetchLeaderboardEntry({
    address,
  }: {
    eventId: PRECONF_EVENT.BASEDLINER;
    address: Address;
  }): Promise<BasedlinerLeaderboard | null> {
    const res = await fetch(`/api/basedliner/leaderboard/entry?address=${address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      console.error('Error calling API:', res.status, res.statusText);
      throw new Error(`API call failed: ${res.status} ${res.statusText}`);
    }
    const response = await res.json();
    if (!response.entry) {
      log('No entry found for address:', address);
      return null;
    }
    log('Entry:', response.entry);
    // 3. Parse the response and return it
    const parsed = {
      ...response.entry,
      phase1: (response.entry.phase1 || 0) / 1000,
      phase2: (response.entry.phase2 || 0) / 1000,
    };
    return parsed;
  }
}

function mapBasedlinerLeaderboardRow(row: BasedlinerLeaderboard): UnifiedLeaderboardRow {
  if (!row.rank) {
    throw new Error('');
  }
  return {
    address: row.address,
    rank: row.rank,
    icon: '',
    data: [],
    totalScore: row.diff ? row.diff : 0,
  };
}

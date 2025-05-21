import { type Address, zeroAddress } from 'viem';

import getConnectedAddress from '$shared/utils/getConnectedAddress';
import { getLogger } from '$shared/utils/logger';

import { BasedLinerAdapter } from '../adapter/BasedLinerAdapter';
import type { InternalAPIPayload } from '../dto/InternalAPIPayload';
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
  static async getLeaderboard({ eventId, phaseId }: { eventId: number; phaseId: PRECONF_CAMPAIGN_PHASE }) {
    const res = await fetch(`/api/basedliner/leaderboard/entry`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, phaseId }),
    });

    log('Response from BasedLinerService:', res);

    if (!res.ok) {
      console.error('Error calling API:', res.status, res.statusText);
      throw new Error(`API call failed: ${res.status} ${res.statusText}`);
    }
    // 3. Parse the response and return it
    return await res.json();
  }

  static async getLeaderboardEntry({ address }: { eventId: PRECONF_EVENT.BASEDLINER; address: Address }) {
    const res = await fetch(`/api/basedliner/leaderboard/entry?address=${address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      console.error('Error calling API:', res.status, res.statusText);
      throw new Error(`API call failed: ${res.status} ${res.statusText}`);
    }
    const response = await res.json();
    log('Entry:', response.entry);
    // 3. Parse the response and return it
    const parsed = {
      ...response.entry,
      phase1: Math.floor((response.entry.phase1 || 0) / 1000),
      phase2: Math.floor((response.entry.phase2 || 0) / 1000),
    };
    return parsed;
  }
}

import { type Address, getAddress } from 'viem';

import { browser } from '$app/environment';
import { getLogger } from '$shared/utils/logger';

import type { PRECONF_CAMPAIGN_PHASE, PRECONF_EVENT } from '../types';

const log = getLogger('preconf:resubmitStorage');

interface ResubmitState {
  timestamp: number;
  address: Address;
  eventId: PRECONF_EVENT;
  phaseId: PRECONF_CAMPAIGN_PHASE;
}

const STORAGE_KEY = 'basedliner_resubmit_state';
const COOLDOWN_DURATION = 120 * 1000; // 2 minutes in milliseconds

/**
 * Utility for managing persistent resubmit blocking state for BasedLiners
 * Prevents bypassing resubmit cooldown via page refresh
 */
export class ResubmitStorage {
  /**
   * Sets a resubmit block for the specified user and phase
   */
  static setResubmitBlock(address: Address, eventId: PRECONF_EVENT, phaseId: PRECONF_CAMPAIGN_PHASE): void {
    if (!browser) return;

    try {
      const state: ResubmitState = {
        timestamp: Date.now(),
        address: getAddress(address),
        eventId,
        phaseId,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      log('Resubmit block set for:', { address, eventId, phaseId });
    } catch (error) {
      log('Error setting resubmit block:', error);
    }
  }

  /**
   * Checks if resubmit is currently blocked for the specified user and event
   * Note: Blocks persist across phases for the same event
   */
  static isResubmitBlocked(address: Address, eventId: PRECONF_EVENT): boolean {
    if (!browser) return false;

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) return false;

      const state: ResubmitState = JSON.parse(storedData);

      // Check if this is for the same user and event (phase doesn't matter)
      if (state.address !== getAddress(address) || state.eventId !== eventId) {
        return false;
      }

      // Check if cooldown period has expired
      const elapsed = Date.now() - state.timestamp;
      const isBlocked = elapsed < COOLDOWN_DURATION;

      if (!isBlocked) {
        // Cooldown has expired, clean up the storage
        this.clearResubmitBlock();
        log('Resubmit cooldown expired, block cleared');
      } else {
        log('Resubmit still blocked, remaining time:', COOLDOWN_DURATION - elapsed);
      }

      return isBlocked;
    } catch (error) {
      log('Error checking resubmit block:', error);
      // If there's an error parsing, assume not blocked and clean up
      this.clearResubmitBlock();
      return false;
    }
  }

  /**
   * Gets the remaining cooldown time in milliseconds for the specified user and event
   * Note: Cooldowns persist across phases for the same event
   */
  static getRemainingCooldown(address: Address, eventId: PRECONF_EVENT): number {
    if (!browser) return 0;

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) return 0;

      const state: ResubmitState = JSON.parse(storedData);

      // Check if this is for the same user and event (phase doesn't matter)
      if (state.address !== getAddress(address) || state.eventId !== eventId) {
        return 0;
      }

      const elapsed = Date.now() - state.timestamp;
      const remaining = Math.max(0, COOLDOWN_DURATION - elapsed);

      return remaining;
    } catch (error) {
      log('Error getting remaining cooldown:', error);
      return 0;
    }
  }

  /**
   * Clears the resubmit block
   */
  static clearResubmitBlock(): void {
    if (!browser) return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      log('Resubmit block cleared');
    } catch (error) {
      log('Error clearing resubmit block:', error);
    }
  }

  /**
   * Clears resubmit blocks for different users/events (cleanup utility)
   * Note: Does NOT clear blocks for different phases of the same event
   */
  static clearResubmitBlockIfDifferent(
    address: Address,
    eventId: PRECONF_EVENT,
    phaseId: PRECONF_CAMPAIGN_PHASE,
  ): void {
    if (!browser) return;

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) return;

      const state: ResubmitState = JSON.parse(storedData);

      // Only clear if it's for a different user or event (NOT different phase)
      // This allows cooldown to persist across phase switches
      if (state.address !== getAddress(address) || state.eventId !== eventId) {
        this.clearResubmitBlock();
        log('Cleared resubmit block for different user/event:', {
          address: getAddress(address),
          eventId,
          phaseId,
          storedAddress: state.address,
          storedEventId: state.eventId,
          storedPhaseId: state.phaseId,
        });
      } else {
        log('Same user and event, keeping resubmit block (may be different phase)');
      }
    } catch (error) {
      log('Error checking different resubmit block:', error);
      // If there's an error, just clear it
      this.clearResubmitBlock();
    }
  }
}

export default ResubmitStorage;

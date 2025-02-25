// wagmiWatcher.ts

import { getAccount, watchAccount } from '@wagmi/core';
import { get } from 'svelte/store';
import type { Address } from 'viem';

import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { account } from '$shared/stores/account';
import { activeSeason } from '$shared/stores/activeSeason';
import { blacklistModal, switchChainModal } from '$shared/stores/modal';
import { isSupportedChain } from '$shared/utils/chain';
import { debounce } from '$shared/utils/debounce';
import { getLogger } from '$shared/utils/logger';

import { wagmiConfig } from '.';

let unWatchAccount: (() => void) | null = null;

const log = getLogger('wagmi:watcher');

let previousAddress: string | null = null;
let previousChainId: number | null = null;

/**
 * Checks if the user is blacklisted and updates the blacklist modal accordingly.
 * @param {Address} address - The user's address.
 */
async function checkBlacklist(address: Address) {
  try {
    const blacklisted = await profileService.getBlacklistStatus(address, get(activeSeason));
    if (blacklisted) {
      blacklistModal.set(true);
    } else {
      blacklistModal.set(false);
    }
  } catch (error) {
    log('Error fetching profile:', error);
  }
}

/**
 * Handles account changes with debouncing to optimize performance.
 * @param {object} data - The account data.
 */
const handleChange = debounce(async (data) => {
  log('Account changed', data);
  account.set(data);
console.log('set account', data)
  const { chainId, address } = data;

  // Prevent redundant profile fetching
  if (address === previousAddress && chainId === previousChainId) {
    log('No change in address or chain, skipping profile fetch.');
    if (address) {
      await checkBlacklist(address);
    }
    return;
  }

  previousAddress = address;
  previousChainId = chainId;

  // Handle unsupported chains
  if (chainId && address) {
    const supported = isSupportedChain(Number(chainId));
    switchChainModal.set(!supported);
    if (!supported) {
      log('Unsupported chain', chainId);
    }
  }

  if (address) {
    await checkBlacklist(address);
  }
}, 200);

/**
 * Starts watching for account changes and performs an initial blacklist check.
 */
export async function startWatching() {
  // Retrieve and set the current account
  const currentAccount = getAccount(wagmiConfig);
  account.set(currentAccount);

  // Initialize watcher if not already active
  if (!unWatchAccount) {
    log('Starting account watcher');

    // Start watching the account
    unWatchAccount = watchAccount(wagmiConfig, {
      onChange: handleChange,
    });
  } else {
    // If watcher is already active, log and proceed
    log('Account watcher already running, performing blacklist check on current account');
  }

  // Perform blacklist check on the current account
  if (currentAccount.address) {
    await checkBlacklist(currentAccount.address);
  }
}

/**
 * Stops watching for account changes.
 */
export function stopWatching() {
  if (unWatchAccount) {
    unWatchAccount();
    unWatchAccount = null;
    log('Stopped account watcher');
  }
}

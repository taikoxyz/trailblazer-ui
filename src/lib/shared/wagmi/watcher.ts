import { getAccount, watchAccount } from '@wagmi/core';
import { get } from 'svelte/store';

import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
import { activeSeason } from '$lib/shared/stores/activeSeason';
import { getLogger } from '$libs/util/logger';
import { account } from '$stores/account';
import { switchChainModal } from '$stores/modal';

import { isSupportedChain } from '../utils/chain';
import { wagmiConfig } from '.';

let unWatchAccount: (() => void) | null = null;

const log = getLogger('wagmi:watcher');

export async function startWatching() {
  // Set account if exists
  const currentAccount = getAccount(wagmiConfig);
  account.set(currentAccount);

  if (!unWatchAccount) {
    log('Starting account watcher');
    unWatchAccount = watchAccount(wagmiConfig, {
      async onChange(data) {
        log('Account changed', data);
        account.set(data);

        const { chainId, address } = data;
        if (chainId && address) {
          if (!isSupportedChain(Number(chainId))) {
            log('Unsupported chain', chainId);
            switchChainModal.set(true);
          } else {
            switchChainModal.set(false);
          }
        }
        profileService.getProfile(data.address, get(activeSeason));
      },
    });
  } else {
    // return current account with wagmiConfig
    log('Account watcher already running, returning current account');
    const currentAccount = getAccount(wagmiConfig);

    return currentAccount;
  }
}

export function stopWatching() {
  if (unWatchAccount) {
    unWatchAccount();
    unWatchAccount = null;
    log('Stopped account watcher');
  }
}

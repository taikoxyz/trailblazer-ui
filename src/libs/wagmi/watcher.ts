import { getAccount, watchAccount } from '@wagmi/core';

import { Season1Bonus } from '$libs/bonus/s1/season1';
import { isSupportedChain } from '$libs/chain';
import { getLogger } from '$libs/util/logger';
import { account } from '$stores/account';
import { switchChainModal } from '$stores/modal';

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
            await Season1Bonus.refreshData();
            switchChainModal.set(false);
          }
        }
      },
    });
  } else {
    // return current account with wagmiConfig
    log('Account watcher already running, returning current account');
    const currentAccount = getAccount(wagmiConfig);
    account.set(currentAccount);
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

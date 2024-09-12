import { getAccount, watchAccount } from '@wagmi/core';

import { isBlacklisted } from '$libs/blacklist/isBlacklisted';
import { isSupportedChain } from '$libs/chain';
import { Galxe } from '$libs/galxe';
import { getLogger } from '$libs/util/logger';
import { account } from '$stores/account';
import { blacklistModal, switchChainModal } from '$stores/modal';

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
            await Galxe.refreshData();
            switchChainModal.set(false);
          }
          if (await isBlacklisted(address)) {
            console.warn('Account is blacklisted');
            blacklistModal.set(true);
            return;
          } else {
            blacklistModal.set(false);
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

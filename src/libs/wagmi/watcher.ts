import { watchAccount } from '@wagmi/core';

import { isSupportedChain } from '$libs/chain';
import { Galxe } from '$libs/galxe';
import { refreshUserBalance } from '$libs/util/balance';
import { getLogger } from '$libs/util/logger';
import { account } from '$stores/account';
import { switchChainModal } from '$stores/modal';

import { wagmiConfig } from '.';

let isWatching = false;
let unWatchAccount: () => void = () => {};

const log = getLogger('wagmi:watcher');

export async function startWatching() {
  if (!isWatching) {
    unWatchAccount = watchAccount(wagmiConfig, {
      async onChange(data) {
        log('Account changed', data);
        account.set(data);
        // refreshUserBalance();
        const { chainId, address } = data;

        if (chainId && address) {
          // We need to check if the chain is supported, and if not
          // we present the user with a modal to switch networks.
          if (chainId && !isSupportedChain(Number(chainId))) {
            log('Unsupported chain', chainId);
            switchChainModal.set(true);
            return;
          } else if (chainId) {
            refreshUserBalance();
            await Galxe.refreshData();
            switchChainModal.set(false);
          }
          await Galxe.refreshData();
        }
      },
    });

    isWatching = true;
  }
}

export function stopWatching() {
  if (typeof unWatchAccount === 'function') {
    unWatchAccount();
  }
  isWatching = false;
}

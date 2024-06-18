import { watchAccount } from '@wagmi/core';

import { isSupportedChain } from '$libs/chain';
import { Galxe } from '$libs/galxe';
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

        const { chainId, address } = data;
        if (chainId && address) {
          // We need to check if the chain is supported, and if not
          // we present the user with a modal to switch networks.
          if (chainId && !isSupportedChain(Number(chainId))) {
            log('Unsupported chain', chainId);
            switchChainModal.set(true);
            return;
          } else if (chainId) {
            await Galxe.refreshData();
            switchChainModal.set(false);
          }
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

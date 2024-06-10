import { account, address } from '$stores/account';
import { getCurrentAddressOrNull, wagmiConfig } from '.';

import { get } from 'svelte/store';
import { watchAccount } from '@wagmi/core';
import { refreshUserBalance } from '$libs/util/balance';

let isWatching = false;
let unWatchAccount: () => void;

export async function startWatching() {
  address.set(getCurrentAddressOrNull());

  if (!isWatching) {
    // Action for subscribing to network changes.
    // See https://wagmi.sh/core/actions/watchNetwork
    unWatchAccount = watchAccount(wagmiConfig, {
      async onChange(data) {
        console.log("🚀 | onChange | data:", data)
        account.set(data);
        await refreshUserBalance();
        // Update address if differen t
        if (data.address !== get(address)) {
          address.set(data.address);
        }
          console.log("🚀 | onChange | address:", get(address))
        isWatching = true;
      },
    });
  }
}

export function stopWatching() {
  unWatchAccount();
  isWatching = false;
}

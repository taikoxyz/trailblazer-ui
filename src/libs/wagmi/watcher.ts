import { watchAccount } from '@wagmi/core';
import { get } from 'svelte/store';

import { Profile } from '$libs/profile';
import { refreshUserBalance } from '$libs/util/balance';
import { account, address } from '$stores/account';

import { getCurrentAddressOrNull, wagmiConfig } from '.';

let isWatching = false;
let unWatchAccount: () => void;

export async function startWatching() {
  address.set(getCurrentAddressOrNull());

  if (!isWatching) {
    // Action for subscribing to network changes.
    // See https://wagmi.sh/core/actions/watchNetwork
    unWatchAccount = watchAccount(wagmiConfig, {
      async onChange(data) {
        account.set(data);
        await refreshUserBalance();
        // Update address if differen t
        if (data.address !== get(address)) {
          console.log(`Address Changed: ${data.address}`);
          await Profile.getProfile(data.address);
          await Profile.getUserPointsHistory(data.address);
          address.set(data.address);
        }
        isWatching = true;
      },
    });
  }
}

export function stopWatching() {

  if (typeof unWatchAccount === 'function') {
    unWatchAccount();
    isWatching = false;
  }

}

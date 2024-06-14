import { watchAccount } from '@wagmi/core';

import { isSupportedChain } from '$libs/chain';
import { Galxe } from '$libs/galxe';
import { refreshUserBalance } from '$libs/util/balance';
import { getLogger } from '$libs/util/logger';
import { account } from '$stores/account';
import { switchChainModal } from '$stores/modal';

import { wagmiConfig } from '.';

let isWatching = false;
let unWatchAccount: () => void;

// export async function startWatching() {
//   address.set(getCurrentAddressOrNull());

//   if (!isWatching) {
//     // Action for subscribing to network changes.
//     // See https://wagmi.sh/core/actions/watchNetwork
//     unWatchAccount = watchAccount(wagmiConfig, {
//       async onChange(data) {
//         account.set(data);
//         await refreshUserBalance();
//         await Galxe.refreshData();

//         // Update address if differen t
//         if (data.address !== get(address)) {
//           // console.log(`Address Changed: ${data.address}`);
//           await Profile.getProfile(data.address);
//           await Profile.getUserPointsHistory(data.address);
//           address.set(data.address);
//         }
//         isWatching = true;
//       },
//     });
//   }
// }

// export function stopWatching() {
//   unWatchAccount();
//   isWatching = false;
// }


const log = getLogger('wagmi:watcher');


export async function startWatching() {

  if (!isWatching) {
    unWatchAccount = watchAccount(wagmiConfig, {
      async onChange(data) {
        log('Account changed', data);

        refreshUserBalance();
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
          }
          account.set(data);
          await Galxe.refreshData();
        }
      },
    });

    isWatching = true;
  }
}

export function stopWatching() {
  unWatchAccount();
  isWatching = false;
}

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from '@wagmi/core';

import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';
import { chains } from '$lib/shared/utils/chain';

export const wagmiAdapter = new WagmiAdapter({
  projectId: PUBLIC_WALLETCONNECT_PROJECT_ID,
  networks: chains,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

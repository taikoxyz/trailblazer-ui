import { cookieStorage, createStorage, reconnect } from '@wagmi/core';
import { defaultWagmiConfig } from '@web3modal/wagmi';

import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';
import { chains } from '$lib/shared/utils/chain';

const metadata = {
  name: 'Taiko Trailblazer',
  description: 'Taiko Trailblazer',
  url: 'https://trailblazers.taiko.xyz/',
  icons: ['https://avatars.githubusercontent.com/u/99078433'],
};

export const wagmiConfig = defaultWagmiConfig({
  chains,
  metadata,
  projectId: PUBLIC_WALLETCONNECT_PROJECT_ID,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

reconnect(wagmiConfig);

import { createAppKit } from '@reown/appkit';

import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';
import { chains } from '$lib/shared/utils/chain';
import { wagmiAdapter } from '$shared/wagmi/client';

const metadata = {
  name: 'Taiko Trailblazer',
  description: 'Taiko Trailblazer',
  url: 'https://trailblazers.taiko.xyz/',
  icons: ['https://avatars.githubusercontent.com/u/99078433'],
};

export const web3modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: chains,
  metadata: metadata,
  projectId: PUBLIC_WALLETCONNECT_PROJECT_ID,
  features: {
    analytics: true,
  },
});

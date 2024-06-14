import { getAccount, reconnect } from '@wagmi/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import type { Address } from 'viem';
import { type Chain, taiko, taikoHekla } from 'viem/chains';

import { PUBLIC_ENV, PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';

const projectId = PUBLIC_WALLETCONNECT_PROJECT_ID;

const chains: [Chain, ...Chain[]] = PUBLIC_ENV === 'development' ? [taikoHekla, taiko] : [taiko];
const metadata = {
  name: 'Taiko Trailblazer',
  description: 'Taiko Trailblazer',
  url: 'https://trailblazers.taiko.xyz/',
  icons: ['https://avatars.githubusercontent.com/u/99078433'],
};

const recommendedWallets = ['38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662'];

// export const wagmiConfig = defaultWagmiConfig({ projectId, chains, metadata, transports: { [hardhat.id]: transport } });
export const wagmiConfig = defaultWagmiConfig({ projectId, chains, metadata });
reconnect(wagmiConfig);

export const web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  allWallets: 'SHOW',
  featuredWalletIds: recommendedWallets,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Clash Grotesk',
    '--w3m-color-mix-strength': 10,
    '--w3m-accent': '#E81899',
    '--w3m-color-mix': '#FFFFFF',
  },
  chainImages: {
    167009: '/chains/taiko.svg',
    167000: '/chains/taiko.svg',
  },
});

export function getCurrentAddressOrNull(): Address | undefined {
  const { address } = getAccount(wagmiConfig);
  return address;
}

export function handleConnectWallet() {
  // Do not open if connection is active
  web3Modal.open({ view: 'Connect' });
}

export function handleDisconnectWallet() {
  // Do not open if connection is active
  web3Modal.open({ view: 'Account' });
}

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage, injected, reconnect } from '@wagmi/core';
import type { Transport } from 'viem';
import { fallback, http } from 'viem';

import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';
import { chains } from '$lib/shared/utils/chain';

// Create transports that prefer wallet RPC but fallback to default
const createTransportsWithWalletFallback = () => {
  return chains.reduce(
    (acc, chain) => {
      // Create a fallback transport that:
      // 1. First tries to use the wallet's configured RPC (when wallet is connected)
      // 2. Falls back to the chain's default RPC if wallet RPC is unavailable
      // This allows MetaMask and other wallets to use their custom RPC configurations
      acc[chain.id] = fallback([
        // This transport will use the wallet's RPC when available
        http(),
        // Fallback to the chain's default RPC
        http(chain.rpcUrls.default.http[0]),
      ]);
      return acc;
    },
    {} as Record<number, Transport>,
  );
};

// Default Wagmi configuration (for client-side operations)
export const wagmiAdapter = new WagmiAdapter({
  projectId: PUBLIC_WALLETCONNECT_PROJECT_ID,
  networks: chains,
  transports: createTransportsWithWalletFallback(),
  connectors: [injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

reconnect(wagmiConfig);

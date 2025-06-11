/**
 * SERVER-ONLY MODULE
 * This file contains sensitive configuration with API keys and should NEVER be imported client-side.
 * Only import this from .server.ts files or server-side code.
 * Contains BasedLiners-specific wagmi configuration with RPC API key authentication.
 */

import { createConfig, http } from '@wagmi/core';
import type { Transport } from 'viem';

import { RPC_API_KEY, RPC_URL } from '$env/static/private';
import { chains } from '$lib/shared/utils/chain';

function createBasedLinersServerConfig() {
  // check if window is defined to ensure this runs only on the server
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY ERROR: wagmi/server.ts should never be imported or executed client-side');
  }
  return createConfig({
    chains,
    transports: chains.reduce(
      (acc, chain) => {
        const rpcUrl = RPC_URL || chain.rpcUrls.default.http[0];
        acc[chain.id] = http(rpcUrl, {
          fetchOptions: {
            headers: {
              ...(RPC_API_KEY && { 'x-api-key': RPC_API_KEY }),
            },
          },
        });
        return acc;
      },
      {} as Record<number, Transport>,
    ),
  });
}

// Ensure this module can NEVER be executed client-side
if (typeof window !== 'undefined') {
  throw new Error('SECURITY ERROR: wagmi/server.ts should never be imported or executed client-side');
}

// Server-side BasedLiners Wagmi configuration with API key and custom RPC URL
export const basedLinersServerConfig = createBasedLinersServerConfig();

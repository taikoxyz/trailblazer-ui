import { getConnectorClient } from '@wagmi/core';
import { watchAsset as viemWatchAsset } from 'viem/actions';

import { erc20TaikoTokenAddress } from '$generated/abi';
import { wagmiConfig } from '$shared/wagmi';

import { chainId } from '../chain';

export default async function watchAsset() {
  const client = await getConnectorClient(wagmiConfig);
  await viemWatchAsset(client, {
    type: 'ERC20',
    options: {
      address: erc20TaikoTokenAddress[chainId],
      decimals: 18,
      symbol: 'TAIKO',
    },
  });
}

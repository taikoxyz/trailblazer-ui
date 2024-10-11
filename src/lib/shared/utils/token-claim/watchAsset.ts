import { getConnectorClient } from '@wagmi/core';
import { watchAsset as viemWatchAsset } from 'viem/actions';

import { wagmiConfig } from '$shared/wagmi';

export default async function watchAsset() {
  const client = await getConnectorClient(wagmiConfig);
  await viemWatchAsset(client, {
    type: 'ERC20',
    options: {
      // mainnet
      // address: '0xa9d23408b9ba935c230493c40c73824df71a0975',
      address: '0x48E948322e282C586173ED8258B18616500717D1',
      decimals: 18,
      symbol: 'TKO',
    },
  });
}

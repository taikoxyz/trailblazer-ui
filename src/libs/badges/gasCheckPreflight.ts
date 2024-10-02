import { getGasPrice } from '@wagmi/core';
import { getBalance } from '@wagmi/core';
import { type Address } from 'viem';

import { claimPreflightConfig } from '$config';
import { wagmiConfig } from '$lib/shared/wagmi';

export default async function gasCheckPreflight(address: Address): Promise<boolean> {
  const balance = await getBalance(wagmiConfig, {
    address,
  });

  const balanceGwei = balance.value;
  const { maxGasUsed } = claimPreflightConfig;
  const gasPrice = await getGasPrice(wagmiConfig);
  const price = maxGasUsed * gasPrice;

  return balanceGwei > price;
}

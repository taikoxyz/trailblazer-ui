import { getGasPrice } from '@wagmi/core';
import { getBalance } from '@wagmi/core';
import { type Address } from 'viem';

import { wagmiConfig } from '$libs/wagmi';

export default async function gasCheckPreflight(address: Address): Promise<boolean> {
  const balance = await getBalance(wagmiConfig, {
    address,
  });

  const balanceGwei = balance.value;
  // max gas used by 15/07/2024 = 239547
  const maxGasUsed = 240_000n;
  const gasPrice = await getGasPrice(wagmiConfig);
  const price = maxGasUsed * gasPrice;

  return balanceGwei > price;
}

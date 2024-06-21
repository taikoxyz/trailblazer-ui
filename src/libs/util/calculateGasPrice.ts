import { getGasPrice } from '@wagmi/core';
import { parseGwei } from 'viem';

import { wagmiConfig } from '$libs/wagmi';

export default async function calculateGasPrice(): Promise<bigint> {
  const currentGasPrice = await getGasPrice(wagmiConfig);
  const minGasPrice = parseGwei('0.01');
  // return max value
  return currentGasPrice > minGasPrice ? currentGasPrice : minGasPrice;
}

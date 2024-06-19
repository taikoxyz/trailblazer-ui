import { getGasPrice } from '@wagmi/core';
import { parseGwei } from 'viem';

import { wagmiConfig } from '$libs/wagmi';

export default async function calculateGasPrice(): Promise<bigint> {
  const currentGasPrice = parseInt((await getGasPrice(wagmiConfig)).toString());
  const minGasPrice = parseInt(parseGwei('0.01').toString());
  return BigInt(Math.max(currentGasPrice, minGasPrice));
}

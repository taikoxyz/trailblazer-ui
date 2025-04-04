import { getAccount } from '@wagmi/core';
import { type Address, zeroAddress } from 'viem';

import { wagmiConfig } from '$lib/shared/wagmi';

export default function getConnectedAddress(): Address {
  const wagmiAddress = getAccount(wagmiConfig).address;
  if (!wagmiAddress) {
    return zeroAddress;
  }
  return wagmiAddress;
}

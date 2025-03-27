import { getAccount } from '@wagmi/core';
import { type Address, zeroAddress } from 'viem';

import { wagmiConfig } from '$lib/shared/wagmi';

export default function getConnectedAddress(): Address {
  return '0xcdE4e49C3a59A515363EabC1964c2bc51aBb4060'
  /*
  const wagmiAddress = getAccount(wagmiConfig).address;
  if (!wagmiAddress) {
    return zeroAddress;
  }
  return wagmiAddress;*/
}

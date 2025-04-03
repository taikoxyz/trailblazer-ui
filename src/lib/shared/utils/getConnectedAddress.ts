import { getAccount } from '@wagmi/core';
import { type Address, zeroAddress } from 'viem';

import { wagmiConfig } from '$lib/shared/wagmi';

export default function getConnectedAddress(): Address {
  /*
  const wagmiAddress = getAccount(wagmiConfig).address;
  if (!wagmiAddress) {
    return zeroAddress;
  }
  return wagmiAddress;
  */
  //return '0x4b2Cb0dfB311eba47739BF47A5c4Ae5934671060'

  return '0xdbc902a240942c64fa52a7a0e2020a4cab3b33a3';
}

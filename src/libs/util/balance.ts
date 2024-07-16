import { getAccount, getBalance, type GetBalanceReturnType } from '@wagmi/core';
import { formatEther } from 'viem';

import { truncateString } from '$libs/util/truncateString';
import { wagmiConfig } from '$libs/wagmi';
import { ethBalance } from '$stores/balance';

export function renderBalance(balance: Maybe<GetBalanceReturnType | bigint>, maxlength = 8) {
  if (!balance) return '0.00';
  if (typeof balance === 'bigint') return balance.toString();
  return `${truncateString(balance.value.toString(), maxlength, '')}`;
}

export function renderEthBalance(balance: bigint, maxlength = 8): string {
  return `${truncateString(formatEther(balance).toString(), maxlength, '')} ETH`;
}

export const refreshUserBalance = async () => {
  const account = getAccount(wagmiConfig);
  let balance = BigInt(0);
  if (account?.address) {
    balance = (await getBalance(wagmiConfig, { address: account.address })).value;
  }
  ethBalance.set(balance);
};

import { getAccount, getBalance, type GetBalanceReturnType } from '@wagmi/core';
import { formatEther } from 'viem';

import { wagmiConfig } from '$lib/shared/wagmi';
import { ethBalance } from '$shared/stores/balance';
import { truncateString } from '$shared/utils/truncateString';

export function renderBalance(balance: Maybe<GetBalanceReturnType>): string {
  if (!balance) return '0.00';

  const [integerPart, decimalPart] = balance.formatted.split('.');
  const maxlength = Number(balance.formatted) < 0.000001 ? balance.decimals : 6;

  const truncatedDecimal = decimalPart ? truncateString(decimalPart, maxlength, '') : '';
  const formattedBalance = decimalPart ? `${integerPart}.${truncatedDecimal}` : integerPart;

  return `${formattedBalance} ${truncateString(balance.symbol, 7)}`;
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

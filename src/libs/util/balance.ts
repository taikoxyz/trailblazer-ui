import { getAccount, getBalance, type GetBalanceReturnType } from '@wagmi/core';
import { formatEther } from 'viem';

import { truncateString } from '$libs/util/truncateString';
import { config } from '$libs/wagmi';
import { ethBalance } from '$stores/balance';

export function renderBalance(balance: Maybe<GetBalanceReturnType>) {
  if (!balance) return '0.00';

  // Determine the appropriate number of decimal places
  const formattedNumber = parseFloat(balance.formatted);
  const maxLength = formattedNumber !== 0 && formattedNumber < 0.000001 ? balance.decimals : 2;

  // Truncate and format the number
  const formattedBalance = formattedNumber.toFixed(maxLength);

  return `${formattedBalance} ${truncateString(balance.symbol, 7)}`;
}

export function renderEthBalance(balance: bigint): string {
  // Convert balance from wei to ether and format to 2 decimal places
  const formattedBalance = parseFloat(formatEther(balance)).toFixed(2);
  return `${formattedBalance} ETH`;
}

export const refreshUserBalance = async () => {
  const account = getAccount(config);
  let balance = BigInt(0);
  if (account?.address) {
    balance = (await getBalance(config, { address: account.address })).value;
  }
  ethBalance.set(balance);
};

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

/**
 * Renders the ETH balance from wei.
 *
 * @param wei - The balance in wei as a bigint.
 * @param maxDecimals - The maximum number of decimal places to display (default is 18).
 * @param rounding - The rounding mode: 'floor', 'ceil', or 'round' (default is 'round').
 * @returns A formatted ETH balance string.
 */
export function renderEthBalance(
  wei: bigint,
  maxDecimals: number = 18,
  rounding: 'floor' | 'ceil' | 'round' = 'round',
): string {
  if (maxDecimals < 0 || maxDecimals > 18) {
    throw new RangeError('maxDecimals must be between 0 and 18');
  }

  const power = 10n ** BigInt(18 - maxDecimals);
  const remainder = wei % power;

  // Prevent negative exponents
  let firstDecimal = 0n;
  if (maxDecimals < 18) {
    firstDecimal = remainder / 10n ** BigInt(17 - maxDecimals);
  }

  let b = wei - remainder;

  if (rounding === 'ceil' || (rounding === 'round' && firstDecimal >= 5)) {
    b += power;
  }

  const formattedBalance = formatEther(b);
  const [integerPart] = formattedBalance.split('.');

  if (integerPart.length > 5) {
    return `${integerPart}... ETH`;
  }

  return `${formattedBalance} ETH`;
}

export const refreshUserBalance = async () => {
  const account = getAccount(wagmiConfig);
  let balance = BigInt(0);
  if (account?.address) {
    balance = (await getBalance(wagmiConfig, { address: account.address })).value;
  }
  ethBalance.set(balance);
};

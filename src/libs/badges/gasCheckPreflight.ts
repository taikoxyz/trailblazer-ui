import { getTransactionReceipt } from '@wagmi/core';
import { getBalance } from '@wagmi/core';
import { type Address, createPublicClient, http } from 'viem';
import { taiko, taikoHekla } from 'viem/chains';

import { chainId } from '$libs/chain';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';
import { wagmiConfig } from '$libs/wagmi';

import { trailblazersBadgesAbi, trailblazersBadgesAddress } from '../../generated/abi';

export default async function gasCheckPreflight(address: Address): Promise<boolean> {
  const publicClient = createPublicClient({
    chain: isDevelopmentEnv ? taikoHekla : taiko,
    transport: http(isDevelopmentEnv ? 'https://rpc.hekla.taiko.xyz' : 'https://rpc.mainnet.taiko.xyz'),
  });

  const currentBlockNumber = await publicClient.getBlockNumber();

  const logs = await publicClient.getContractEvents({
    address: trailblazersBadgesAddress[chainId],
    abi: trailblazersBadgesAbi,
    eventName: 'BadgeCreated',
    fromBlock: currentBlockNumber - 1000n,
  });

  const balance = await getBalance(wagmiConfig, {
    address,
  });

  const balanceGwei = balance.value;

  const txPrices: bigint[] = [];
  for (const log of logs) {
    const receipt = await getTransactionReceipt(wagmiConfig, { hash: log.transactionHash });

    const { effectiveGasPrice, gasUsed } = receipt;

    const price = gasUsed * effectiveGasPrice;

    txPrices.push(price);
  }

  const avgTxPrice = txPrices.reduce((a, b) => a + b, 0n) / BigInt(txPrices.length);

  return balanceGwei > avgTxPrice;
}

import { getPublicClient, simulateContract, watchContractEvent, writeContract } from '@wagmi/core';
import type { Abi, Address } from 'viem';

import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';

const log = getLogger('BasedLinerAdapter');

export class BasedLinerAdapter {
  /**
   * Send a transaction to a contract and track the time from sending to receipt
   * @param contractAddress
   * @param abi
   * @param functionName
   * @param args
   * @param value
   * @returns timings and receipt
   */
  static async sendAndTrackTx({
    contractAddress,
    abi,
    functionName,
    args = [],
    value,
    eventName,
    eventArgs,
  }: {
    contractAddress: Address;
    abi: Abi;
    functionName: string;
    args?: unknown[];
    value?: bigint;
    eventName?: string;
    eventArgs?: Record<string, unknown>;
  }) {
    log('sendAndTrackTx', { contractAddress, functionName, args, value });
    // Simulate transaction
    const { request } = await simulateContract(wagmiConfig, {
      abi,
      address: contractAddress,
      functionName,
      args,
      value,
      chainId,
    });
    const start = performance.now();
    // Optionally watch for event
    let unwatch: (() => void) | undefined;
    let eventPromise: Promise<unknown> | undefined;
    if (eventName) {
      eventPromise = new Promise((resolve, reject) => {
        unwatch = watchContractEvent(wagmiConfig, {
          address: contractAddress,
          abi,
          eventName,
          args: eventArgs,
          onLogs(logs) {
            log('event logs', logs);
            unwatch && unwatch();
            resolve(logs);
          },
          onError(error) {
            unwatch && unwatch();
            reject(error);
          },
        });
      });
    }
    // Send transaction
    const txHash = await writeContract(wagmiConfig, request);
    const sent = performance.now();
    // Wait for receipt
    const client = getPublicClient(wagmiConfig);
    if (!client) throw new Error('Could not get public client');
    const receipt = await client.waitForTransactionReceipt({ hash: txHash });
    const end = performance.now();
    // Wait for event if needed
    let eventLogs = undefined;
    if (eventPromise) {
      try {
        eventLogs = await eventPromise;
      } catch (e) {
        log('event watch error', e);
      }
    }
    return {
      txHash,
      receipt,
      timings: {
        sent: sent - start,
        confirmed: end - start,
        mining: end - sent,
      },
      eventLogs,
    };
  }
}

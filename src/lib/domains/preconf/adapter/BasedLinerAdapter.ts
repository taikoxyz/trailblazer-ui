import { simulateContract, writeContract } from '@wagmi/core';
import type { Abi, Address, Hex } from 'viem';

import { wagmiConfig } from '$shared/wagmi';

export class BasedLinerAdapter {
  /**
   * Send a transaction to a contract using the user's wallet (client-side)
   * @param contractAddress
   * @param abi
   * @param functionName
   * @param args
   * @param value
   * @returns txHash
   */
  static async sendTx({
    contractAddress,
    abi,
    functionName,
    args = [],
    value,
  }: {
    contractAddress: Address;
    abi: Abi;
    functionName: string;
    args?: unknown[];
    value?: bigint;
  }) {
    // Simulate transaction
    const { request } = await simulateContract(wagmiConfig, {
      address: contractAddress,
      abi,
      functionName,
      args,
      value,
    });

    // Send transaction
    const txHash: Hex = await writeContract(wagmiConfig, request);
    return txHash;
  }
}

import { readContract, simulateContract, writeContract } from '@wagmi/core';
import type { Hex } from 'viem';

import { BasedLinersAbi, basedLinersAddress } from '$generated/abi';
import { chainId } from '$shared/utils/chain';
import { wagmiConfig } from '$shared/wagmi';

export class BasedLinerAdapter {
  /**
   * Send a transaction to a contract using the user's wallet (client-side)
   * @param args

   * @returns txHash
   */
  static async sendTx({ eventId, phaseId }: { eventId: number; phaseId: number }) {
    // Simulate transaction
    const { request } = await simulateContract(wagmiConfig, {
      address: basedLinersAddress[chainId],
      abi: BasedLinersAbi,
      functionName: 'register',
      args: [BigInt(eventId), BigInt(phaseId)],
    });

    // Send transaction
    const txHash: Hex = await writeContract(wagmiConfig, request);
    return txHash;
  }

  // check if specific phase is open
  static async isPhaseOpen({ eventId, phaseId }: { eventId: number; phaseId: number }) {
    const response = await readContract(wagmiConfig, {
      address: basedLinersAddress[chainId],
      abi: BasedLinersAbi,
      functionName: 'phaseOpen',
      args: [BigInt(eventId), BigInt(phaseId)],
    });

    return response;
  }
}

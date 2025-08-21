import { readContract, simulateContract, writeContract } from '@wagmi/core';
import { type Hex } from 'viem';

import { BasedLinersAbi, basedLinersAddress } from '$generated/abi';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';

const log = getLogger('BasedLinerAdapter');
export class BasedLinerAdapter {
  /**
   * Send a transaction to a contract using the user's wallet (client-side)
   * @param args

   * @returns txHash
   */
  static async sendTx({ eventId, phaseId }: { eventId: number; phaseId: number }) {
    try {
      const { request } = await simulateContract(wagmiConfig, {
        address: basedLinersAddress[chainId],
        abi: BasedLinersAbi,
        functionName: 'register',
        args: [BigInt(eventId), BigInt(phaseId)],
      });

      // Send transaction - let wallet handle gas pricing
      const txHash: Hex = await writeContract(wagmiConfig, request);
      return txHash;
    } catch (error: unknown) {
      // Handle insufficient funds error more clearly
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = String(error.message);
        console.error(error);
        // Check for insufficient funds error patterns
        if (
          errorMessage.includes('insufficient funds') ||
          errorMessage.includes('exceeds the balance') ||
          errorMessage.includes('gas * gas fee + value')
        ) {
          throw new Error('Insufficient ETH balance. Please add ETH to your wallet to cover transaction fees.');
        }

        // Check for gas price errors
        if (errorMessage.includes('maxFeePerGas') || errorMessage.includes('gas price')) {
          throw new Error('Gas price issue. Please try again or adjust gas settings in your wallet.');
        }
      }

      throw error;
    }
  }

  /**
   * Checks if a specific phase is open.
   * @param param0 - The event ID and phase to check.
   * @returns A promise that resolves to a boolean indicating if the phase is open.
   */
  static async isPhaseOpen({ eventId, phaseId }: { eventId: number; phaseId: number }) {
    log(`Checking if phase ${phaseId} is open for event ${eventId}`);
    const response = await readContract(wagmiConfig, {
      address: basedLinersAddress[chainId],
      abi: BasedLinersAbi,
      functionName: 'phaseOpen',
      args: [BigInt(eventId), BigInt(phaseId)],
    });

    return response;
  }
}

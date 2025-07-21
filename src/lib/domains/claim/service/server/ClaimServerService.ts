import type { Address, Hex, TransactionReceipt } from 'viem';

import { ClaimAdapter } from '../../adapter/server/ClaimAdapter.server';
import type { ClaimEligibilityDto, ClaimProofDto } from '../../dto/ClaimServer.dto';

export interface IClaimServerService {
  checkEligibility(address: Address): Promise<ClaimEligibilityDto>;
  executeClaim(address: Address): Promise<{ txHash: Hex; receipt: TransactionReceipt }>;
}

export class ClaimServerService implements IClaimServerService {
  /**
   * Checks user eligibility for claiming without exposing sensitive data.
   * This is a public endpoint that doesn't require API keys.
   * @param address - The user's wallet address
   * @returns Eligibility data with address and claimable value
   */
  async checkEligibility(address: Address): Promise<ClaimEligibilityDto> {
    return await ClaimAdapter.getEligibility(address);
  }

  /**
   * Executes the complete claim process server-side to protect sensitive proof data.
   * This fetches the proof (with API key), executes the transaction, and waits for confirmation.
   * @param address - The user's wallet address
   * @returns Transaction hash and receipt
   */
  async executeClaim(address: Address): Promise<{ txHash: Hex; receipt: TransactionReceipt }> {
    // Get proof data (this requires API key and is only accessible server-side)
    const proofData: ClaimProofDto = await ClaimAdapter.getProof(address);

    // Execute the claim transaction server-side
    const txHash = await ClaimAdapter.executeClaim(address, parseFloat(proofData.value), proofData.proof);

    // Wait for transaction confirmation
    const receipt = await ClaimAdapter.waitForClaimTransactionReceipt({ txHash });

    return { txHash, receipt };
  }

  /**
   * Gets proof data for advanced use cases (internal server-side only).
   * This method should only be used internally and never expose proof data to the client.
   * @param address - The user's wallet address
   * @returns Proof data including the merkle proof
   */
  private async getProofData(address: Address): Promise<ClaimProofDto> {
    return await ClaimAdapter.getProof(address);
  }
}

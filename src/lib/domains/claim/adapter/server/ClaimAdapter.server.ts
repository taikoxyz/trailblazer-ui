import type { Address, Hex } from 'viem';

import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { TooManyRequestsError } from '$shared/types/errors';
import { wagmiConfig } from '$shared/wagmi';

import type { ClaimEligibilityDto, ClaimProofDto } from '../../dto/ClaimServer.dto';

export class ClaimAdapter {
  /**
   * Fetches eligibility data for claiming without API key protection.
   * This endpoint is public and only returns address and value.
   * @param address - The user's wallet address
   * @returns The eligibility data containing address and value
   */
  static async getEligibility(address: Address): Promise<ClaimEligibilityDto> {
    try {
      const url = `/claim/eligibility?address=${encodeURIComponent(address)}`;
      return await fetchFromApi<ClaimEligibilityDto>(url, 4, {
        method: 'GET',
        headers: {},
      });
    } catch (error) {
      console.error('Error fetching claim eligibility', error, { address });

      // Check if it's a 429 Too Many Requests error
      if (error instanceof Error && error.message.includes('API Error: 429')) {
        throw new TooManyRequestsError('Rate limit exceeded. Please wait before checking eligibility again.');
      }

      throw new Error('Failed to fetch claim eligibility');
    }
  }

  /**
   * Fetches proof data for claiming with API key protection.
   * This endpoint requires API key and returns the full proof data.
   * @param address - The user's wallet address
   * @returns The proof data containing address, value, and proof
   */
  static async getProof(address: Address): Promise<ClaimProofDto> {
    try {
      const url = `/claim/proof?address=${encodeURIComponent(address)}`;
      return await fetchFromApi<ClaimProofDto>(url, 4, {
        method: 'GET',
        headers: { 'x-api-key': `${API_KEY}` },
      });
    } catch (error) {
      console.error('Error fetching claim proof', error, { address });

      // Check if it's a 429 Too Many Requests error
      if (error instanceof Error && error.message.includes('API Error: 429')) {
        throw new TooManyRequestsError('Rate limit exceeded. Please wait before requesting proof again.');
      }

      throw new Error('Failed to fetch claim proof');
    }
  }

  /**
   * Executes the claim transaction on the server side to protect the proof.
   * @param address - The user's wallet address
   * @param amount - The amount to claim
   * @param proof - The merkle proof for verification
   * @returns The transaction hash
   */
  static async executeClaim(address: Address, amount: number, proof: string): Promise<Hex> {
    const { writeContract } = await import('@wagmi/core');
    const { erc20AirdropAbi, erc20AirdropAddress } = await import('$generated/abi');
    const { chainId } = await import('$shared/utils/chain');
    const { parseEther } = await import('viem');

    try {
      const tx = await writeContract(wagmiConfig, {
        abi: erc20AirdropAbi,
        address: erc20AirdropAddress[chainId],
        functionName: 'claim',
        args: [address, parseEther(amount.toString()), JSON.parse(proof)],
      });

      return tx;
    } catch (error) {
      console.error('Error executing claim transaction', error, { address, amount });
      throw new Error('Failed to execute claim transaction');
    }
  }

  /**
   * Waits for the claim transaction receipt.
   * @param txHash - The transaction hash to wait for
   * @returns The transaction receipt
   */
  static async waitForClaimTransactionReceipt({ txHash }: { txHash: Hex }) {
    const { getPublicClient } = await import('@wagmi/core');
    const { basedLinersServerConfig } = await import('$shared/wagmi/server');

    const client = getPublicClient(basedLinersServerConfig);

    if (!client) throw new Error('Could not get public client');

    const receipt = await client.waitForTransactionReceipt({ hash: txHash });
    if (!receipt) throw new Error('No receipt found for this txHash');

    return receipt;
  }
}

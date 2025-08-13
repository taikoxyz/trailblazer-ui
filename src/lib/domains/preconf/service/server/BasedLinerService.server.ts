import type { Config } from '@wagmi/core';
import { getBlock, waitForTransactionReceipt } from '@wagmi/core';
import { type Address, type Hex, WaitForTransactionReceiptTimeoutError, zeroAddress } from 'viem';

import { API_KEY } from '$env/static/private';
import { fetchFromApi } from '$shared/services/api/fetchClient';
import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import { basedLinersServerConfig } from '$shared/wagmi/server';

import { BasedLinerAdapter } from '../../adapter/server/BasedLinerAdapter.server';
import type { BasedlinerLeaderboard } from '../../dto/BasedlinerLeaderboard';
import { type PRECONF_CAMPAIGN_PHASE, PRECONF_TX_STAGE } from '../../types';

const log = getLogger('BasedLinerService');
const BASEDLINER_LEADERBOARD_API = '/basedliner/leaderboard';
// 5-minute timeout for transaction receipt waiting (300,000ms)
const TRANSACTION_RECEIPT_TIMEOUT = 5 * 60 * 1000;

/**
 * Utility function to retry getting a block with exponential backoff
 * Only runs in server-side context for security
 */
async function getBlockWithRetry(config: Config, blockNumber: bigint, maxRetries = 5, baseDelay = 1000) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      log(`Attempting to get block ${blockNumber} (attempt ${retryCount + 1})`);
      return await getBlock(config, { blockNumber });
    } catch (error) {
      retryCount++;
      log(`Failed to get block ${blockNumber} (attempt ${retryCount}): ${(error as Error).message}`);
      if (retryCount >= maxRetries) {
        throw new Error(
          `Block ${blockNumber} not available after ${maxRetries} attempts. Block may not be indexed yet.`,
        );
      }

      // Exponential backoff: wait 1s, 2s, 4s, 8s, 16s
      const delay = baseDelay * Math.pow(2, retryCount - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Unable to retrieve block ${blockNumber}`);
}

export class BasedLinerService {
  static getTimingDiffForAddress(address: Address) {
    if (!address) {
      throw new Error('Address is required');
    }
    throw new Error('Method not implemented.');
  }

  static async submitPhase(args: { phase: PRECONF_CAMPAIGN_PHASE; timestamp: number; wallet: Address; txHash: Hex }) {
    const { phase, timestamp, wallet, txHash } = args;

    if (phase === undefined || phase === null || !timestamp || !wallet || wallet === zeroAddress || !txHash) {
      throw new Error('Phase, timestamp, wallet and txHash are required');
    }

    try {
      await BasedLinerAdapter.submitStage({
        stage: PRECONF_TX_STAGE.INITIAL,
        phase,
        timestamp,
        address: wallet,
        tx_hash: txHash,
      });
    } catch (error) {
      console.error('Error submitting phase:', error);

      // Re-throw specific errors to preserve their type
      if (error instanceof TooManyRequestsError) {
        throw error;
      }

      throw new Error('Failed to submit phase');
    }

    let receipt;
    let blockNumber;
    try {
      // Wait for transaction receipt with 5-minute timeout, following the same pattern as pendingTransactions.ts
      receipt = await waitForTransactionReceipt(basedLinersServerConfig, {
        hash: txHash,
        chainId,
        timeout: TRANSACTION_RECEIPT_TIMEOUT,
      });

      if (!receipt) throw new Error('No receipt found for this txHash');
      blockNumber = receipt.blockNumber;
    } catch (error) {
      console.error('Error waiting for transaction receipt:', error);
      if (error instanceof WaitForTransactionReceiptTimeoutError) {
        throw new TransactionTimedOutError(
          `Transaction with hash "${txHash}" timed out after ${TRANSACTION_RECEIPT_TIMEOUT}ms`,
          { cause: error },
        );
      }
      throw new Error(`Failed to get transaction receipt for hash "${txHash}"`, { cause: error });
    }

    // Use retry logic for getBlock in case the block is not yet indexed
    const block = await getBlockWithRetry(basedLinersServerConfig, blockNumber);
    const blockTime = block.timestamp * 1000n;

    try {
      await BasedLinerAdapter.submitStage({
        stage: PRECONF_TX_STAGE.FINAL,
        phase,
        address: wallet,
        timestamp: Number(blockTime),
        tx_hash: txHash,
      });
    } catch (error) {
      console.error('Error submitting phase:', error);

      // Re-throw specific errors to preserve their type
      if (error instanceof TooManyRequestsError) {
        throw error;
      }

      throw new Error('Failed to submit phase');
    }

    // TODO fetch diff from api

    const txTime = BigInt(timestamp);
    const diff = blockTime - txTime;

    // Debug logging for negative values
    if (diff < 0) {
      log(`Negative diff detected: blockTime=${blockTime}, txTime=${txTime}, diff=${diff}ms`);
      log(`Block timestamp: ${Number(block.timestamp)} seconds, Tx timestamp: ${timestamp} ms`);
    }

    // Return absolute value to avoid negative timing results due to clock skew
    return Number(diff < 0n ? -diff : diff);
  }

  /**
   * Fetches the leaderboard data from the API.
   * @param {string} [address] - The address to filter the leaderboard by.
   * @returns {Promise<BasedlinerLeaderboard[]>} - The leaderboard data.
   * @memberof BasedLinerService
   */
  static async getLeaderboard({ address }: { address?: string }) {
    const queryParams = new URLSearchParams();
    if (address) queryParams.set('address', address);
    const endpoint = `${BASEDLINER_LEADERBOARD_API}?${queryParams.toString()}`;
    const response = await fetchFromApi<{ data: { items: BasedlinerLeaderboard[] } }>(endpoint, 4, {
      headers: { 'x-api-key': `${API_KEY}` },
      method: 'GET',
    });
    // If address is provided, return single entry, else return all entries
    if (address) {
      return response.data.items[0] || null;
    }
    return response.data.items || [];
  }

  /**
   * Fetches the leaderboard entry for a specific address.
   * @param {string} address - The address to fetch the leaderboard entry for.
   * @returns {Promise<BasedlinerLeaderboard>} - The leaderboard entry data.
   * @memberof BasedLinerService
   */
  static async getLeaderboardEntry({ address }: { address: string }) {
    return await this.getLeaderboard({ address });
  }
}

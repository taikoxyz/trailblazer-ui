import type { RequestHandler } from '@sveltejs/kit';
import type { Config } from '@wagmi/core';
import { getGasPrice, getTransaction } from '@wagmi/core';
import type { Hex } from 'viem';

import type { InternalAPIPayload } from '$lib/domains/preconf/dto/InternalAPIPayload';
import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';
import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';

const log = getLogger('BasedLinerSubmit');

/**
 * Utility function to retry getting a transaction with exponential backoff
 */
async function getTransactionWithRetry(config: Config, txHash: Hex, maxRetries = 7, baseDelay = 1000) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      log(`Attempting to get transaction ${txHash} (attempt ${retryCount + 1})`);
      return await getTransaction(config, { hash: txHash });
    } catch (error) {
      retryCount++;
      log(`Failed to get transaction ${txHash} (attempt ${retryCount}): ${(error as Error).message}`);
      if (retryCount >= maxRetries) {
        throw new Error(
          `Transaction ${txHash} not available after ${maxRetries} attempts. Transaction may not be indexed yet.`,
        );
      }

      // Exponential backoff: wait 1s, 2s, 4s, 8s, 16s
      const delay = baseDelay * Math.pow(2, retryCount - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Unable to retrieve transaction ${txHash}`);
}

// POST /api/basedliner/submit
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: InternalAPIPayload = await request.json();
    const { phase, wallet, txHash, phaseEnded } = body;

    if (phase == null || !wallet || !txHash) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    if (phaseEnded) {
      // if the phase ended we assume an avg of 42 seconds
      return new Response(JSON.stringify({ diffInSeconds: 42 }), { status: 200 });
    }

    const transaction = await getTransactionWithRetry(wagmiConfig, txHash);
    const gasPrice = await getGasPrice(wagmiConfig);

    // do not allow a transaction with a gas price lower than the current gas price - 10%
    if (transaction?.gasPrice && gasPrice && transaction.gasPrice < (gasPrice * 9n) / 10n) {
      return new Response(JSON.stringify({ error: 'Invalid transaction or gas limit too low' }), { status: 400 });
    }

    const timestamp = Date.now();
    // console.log(`Submitting phase ${phase} for wallet ${wallet} with txHash ${txHash} at ${timestamp}`);
    try {
      const diffInMilliseconds = await BasedLinerService.submitPhase({
        phase,
        wallet,
        txHash,
        timestamp,
      });
      return new Response(JSON.stringify({ diffInSeconds: diffInMilliseconds / 1000 }), { status: 200 });
    } catch (error) {
      console.error('Error submitting phase:', error, wallet, txHash, phase);

      // Handle specific timeout errors with appropriate status code and message
      if (error instanceof TransactionTimedOutError) {
        return new Response(
          JSON.stringify({
            error: 'Transaction timeout',
            message:
              'Transaction timed out while waiting for receipt. Please try again or check the transaction status manually.',
            timeout: true,
          }),
          { status: 408 }, // 408 Request Timeout
        );
      }

      // Handle rate limiting errors with appropriate status code and message
      if (error instanceof TooManyRequestsError) {
        return new Response(
          JSON.stringify({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please wait a moment before trying again.',
            rateLimited: true,
          }),
          { status: 429 }, // 429 Too Many Requests
        );
      }

      // Generic error handling for other types of errors
      return new Response(JSON.stringify({ error: 'Failed to submit phase' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error in /api/basedliner/submit:', error);
    return new Response(JSON.stringify({ error: 'Failed to process registration' }), { status: 500 });
  }
};

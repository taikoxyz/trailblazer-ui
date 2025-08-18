import type { RequestHandler } from '@sveltejs/kit';
import type { Config } from '@wagmi/core';
import { getGasPrice, getTransaction } from '@wagmi/core';
import type { Hex } from 'viem';

import type { InternalAPIPayload } from '$lib/domains/preconf/dto/InternalAPIPayload';
import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';
import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';
import { getLogger } from '$shared/utils/logger';
import { wagmiConfig } from '$shared/wagmi';
import { basedLinersServerConfig } from '$shared/wagmi/server';

const log = getLogger('BasedLinerSubmit');

/**
 * Utility function to retry getting a transaction with exponential backoff
 * Falls back to regular wagmi config on the last attempt if basedLiners config fails
 */
async function getTransactionWithRetry(
  config: Config = basedLinersServerConfig,
  txHash: Hex,
  maxRetries = 7,
  baseDelay = 1000,
) {
  let retryCount = 0;
  if (!txHash) {
    throw new Error('Transaction hash is required');
  }
  while (retryCount < maxRetries) {
    try {
      // Use basedLinersServerConfig for first attempts, fallback to passed config on last attempt
      const configToUse = retryCount === maxRetries - 1 ? wagmiConfig : config;
      return await getTransaction(configToUse, { hash: txHash });
    } catch (error) {
      retryCount++;
      log(`Failed to get transaction ${txHash} (attempt ${retryCount}): ${(error as Error).message}`);
      if (retryCount >= maxRetries) {
        throw new Error(
          `Transaction ${txHash} not available after ${maxRetries} attempts using both basedLiners and fallback RPCs. Transaction may not be indexed yet.`,
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
      // Fetch average phase 1 time from leaderboard
      try {
        const leaderboard = await BasedLinerService.getLeaderboard({});
        const firstEntry = Array.isArray(leaderboard) ? leaderboard[0] : leaderboard;
        if (firstEntry?.avg_phase1) {
          const avgPhase1Ms = Number(firstEntry.avg_phase1);
          return new Response(JSON.stringify({ diffInSeconds: avgPhase1Ms / 1000 }), { status: 200 });
        }
      } catch (error) {
        console.error('Failed to fetch average phase 1 time:', error);
        return new Response(JSON.stringify({ diffInSeconds: 30 }), { status: 200 });
      }

      // Fallback to 30 seconds if API call fails
      return new Response(JSON.stringify({ diffInSeconds: 30 }), { status: 200 });
    }

    const transaction = await getTransactionWithRetry(basedLinersServerConfig, txHash);
    const gasPrice = await getGasPrice(basedLinersServerConfig);

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

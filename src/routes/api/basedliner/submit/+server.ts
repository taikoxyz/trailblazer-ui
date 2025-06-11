import type { RequestHandler } from '@sveltejs/kit';

import type { InternalAPIPayload } from '$lib/domains/preconf/dto/InternalAPIPayload';
import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';
import { TooManyRequestsError, TransactionTimedOutError } from '$shared/types/errors';

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
      console.error('Error submitting phase:', error);

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

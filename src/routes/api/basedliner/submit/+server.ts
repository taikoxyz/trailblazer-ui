import type { RequestHandler } from '@sveltejs/kit';

import type { InternalAPIPayload } from '$lib/domains/preconf/dto/InternalAPIPayload';
import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';

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
      return new Response(JSON.stringify({ error: `Failed to submit phase: ${(error as Error).message}` }), { status: 500 });
    }
  } catch (error) {
    console.error('Error in /api/basedliner/submit:', error);
    return new Response(JSON.stringify({ error: 'Failed to process registration' }), { status: 500 });
  }
};

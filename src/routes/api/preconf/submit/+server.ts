import type { RequestHandler } from '@sveltejs/kit';

import { BasedLinerService } from '$lib/domains/preconf/service/server/BasedLinerService.server';

// POST /api/preconf/submit
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { stage, phase, timestamp, wallet, txHash } = body;

    if (!stage || !phase || !timestamp || !wallet || !txHash) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Call the service to handle registration and timing
    const result = await BasedLinerService.handleRegistration({
      stage,
      phase,
      timestamp,
      wallet,
      txHash,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error in /api/preconf/submit:', error);
    return new Response(JSON.stringify({ error: 'Failed to process registration' }), { status: 500 });
  }
};

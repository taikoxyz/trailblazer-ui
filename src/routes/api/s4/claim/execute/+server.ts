import type { RequestEvent } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import type { Address } from 'viem';

import { API_KEY } from '$env/static/private';
import { ClaimAdapter } from '$lib/domains/claim/adapter/server/ClaimAdapter.server';
import { TooManyRequestsError } from '$shared/types/errors';

export const POST = async ({ request }: RequestEvent) => {
  try {
    // Verify API key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== API_KEY) {
      throw error(401, 'Unauthorized: Invalid or missing API key');
    }

    const body = await request.json();
    const { address, amount, proof } = body;

    if (!address || !amount || !proof) {
      throw error(400, 'Missing required parameters: address, amount, and proof');
    }

    // Execute the claim transaction server-side
    const txHash = await ClaimAdapter.executeClaim(address as Address, amount, proof);

    // Optionally wait for the transaction receipt
    const receipt = await ClaimAdapter.waitForClaimTransactionReceipt({ txHash });

    return json({
      success: true,
      txHash,
      receipt,
    });
  } catch (err) {
    console.error('Error in claim execute endpoint:', err);

    if (err instanceof TooManyRequestsError) {
      throw error(429, err.message);
    }

    if (err instanceof Error && err.message.includes('401')) {
      throw error(401, 'Unauthorized');
    }

    if (err instanceof Error && err.message.includes('400')) {
      throw error(400, 'Invalid request parameters');
    }

    if (err instanceof Error && err.message.includes('insufficient')) {
      throw error(400, 'Insufficient balance or gas');
    }

    throw error(500, 'Internal server error');
  }
};

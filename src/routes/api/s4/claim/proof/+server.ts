import type { RequestEvent } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import type { Address } from 'viem';

import { API_KEY } from '$env/static/private';
import { ClaimAdapter } from '$lib/domains/claim/adapter/server/ClaimAdapter.server';
import { TooManyRequestsError } from '$shared/types/errors';

export const GET = async ({ url, request }: RequestEvent) => {
  try {
    // Verify API key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== API_KEY) {
      throw error(401, 'Unauthorized: Invalid or missing API key');
    }

    const address = url.searchParams.get('address') as Address;

    if (!address) {
      throw error(400, 'Address parameter is required');
    }

    const proofData = await ClaimAdapter.getProof(address);
    return json(proofData);
  } catch (err) {
    console.error('Error in claim proof endpoint:', err);

    if (err instanceof TooManyRequestsError) {
      throw error(429, err.message);
    }

    if (err instanceof Error && err.message.includes('401')) {
      throw error(401, 'Unauthorized');
    }

    if (err instanceof Error && err.message.includes('400')) {
      throw error(400, 'Invalid request parameters');
    }

    if (err instanceof Error && err.message.includes('404')) {
      throw error(404, 'Proof data not found');
    }

    throw error(500, 'Internal server error');
  }
};

export const POST = async ({ request }: RequestEvent) => {
  try {
    const { address } = await request.json();

    if (!address) {
      throw error(400, 'Address is required in request body');
    }

    // The server-side adapter will automatically use the API_KEY
    const proofData = await ClaimAdapter.getProof(address);

    // Transform the response to match client expectations
    return json({
      proof: proofData.proof,
      amount: proofData.value,
    });
  } catch (err) {
    console.error('Error in claim proof endpoint:', err);

    if (err instanceof TooManyRequestsError) {
      throw error(429, err.message);
    }

    if (err instanceof Error && err.message.includes('401')) {
      throw error(401, 'Unauthorized');
    }

    if (err instanceof Error && err.message.includes('400')) {
      throw error(400, 'Invalid request parameters');
    }

    if (err instanceof Error && err.message.includes('404')) {
      throw error(404, 'Proof data not found');
    }

    throw error(500, 'Internal server error');
  }
};

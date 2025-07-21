import type { RequestEvent } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import type { Address } from 'viem';

import { ClaimAdapter } from '$lib/domains/claim/adapter/server/ClaimAdapter.server';
import { TooManyRequestsError } from '$shared/types/errors';

export const GET = async ({ url }: RequestEvent) => {
  try {
    const address = url.searchParams.get('address') as Address;

    if (!address) {
      throw error(400, 'Address parameter is required');
    }

    const eligibilityData = await ClaimAdapter.getEligibility(address);
    return json(eligibilityData);
  } catch (err) {
    console.error('Error in claim eligibility endpoint:', err);

    if (err instanceof TooManyRequestsError) {
      throw error(429, err.message);
    }

    if (err instanceof Error && err.message.includes('400')) {
      throw error(400, 'Invalid request parameters');
    }

    if (err instanceof Error && err.message.includes('404')) {
      throw error(404, 'Eligibility data not found');
    }

    throw error(500, 'Internal server error');
  }
};

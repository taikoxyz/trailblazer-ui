import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { Address } from 'viem';

export const GET = async ({ url }: RequestEvent) => {
  const address = url.searchParams.get('address') as Address;

  if (!address) {
    return new Response('Address parameter is required', { status: 400 });
  }

  // Mock eligibility data based on address
  const mockEligibilityData = {
    address,
    value: getMockClaimValue(address),
  };

  return json(mockEligibilityData);
};

function getMockClaimValue(address: Address): string {
  // Generate a deterministic mock value based on address
  const addressHash = parseInt(address.slice(-8), 16);
  const baseValue = (addressHash % 10000) / 100; // Value between 0-100
  return (baseValue + Math.random() * 50).toFixed(2); // Add some randomness
}

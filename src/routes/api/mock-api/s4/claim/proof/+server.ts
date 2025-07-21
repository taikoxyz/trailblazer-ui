import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { Address } from 'viem';

import { API_KEY } from '$env/static/private';

export const GET = async ({ url, request }: RequestEvent) => {
  // Check API key (required for proof endpoint)
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== API_KEY) {
    return new Response('Unauthorized: Invalid or missing API key', { status: 401 });
  }

  const address = url.searchParams.get('address') as Address;

  if (!address) {
    return new Response('Address parameter is required', { status: 400 });
  }

  // Mock proof data based on address
  const mockProofData = {
    address,
    value: getMockClaimValue(address),
    proof: getMockProof(address),
  };

  return json(mockProofData);
};

export const POST = async ({ request }: RequestEvent) => {
  const { address } = await request.json();

  if (!address) {
    return new Response('Address is required in request body', { status: 400 });
  }

  // Mock proof data based on address - return in expected format
  const mockProofData = {
    proof: getMockProof(address),
    amount: getMockClaimValue(address),
  };

  return json(mockProofData);
};

function getMockClaimValue(address: Address): string {
  // Generate the same deterministic value as eligibility endpoint
  const addressHash = parseInt(address.slice(-8), 16);
  const baseValue = (addressHash % 10000) / 100;
  return (baseValue + 25).toFixed(2); // Consistent with eligibility but slightly different for testing
}

function getMockProof(address: Address): string {
  // Generate a mock merkle proof
  const mockProof = [
    `0x${address.slice(2, 34)}`,
    `0x${address.slice(34)}${'0'.repeat(32 - (address.length - 34))}`,
    '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  ];
  return JSON.stringify(mockProof);
}

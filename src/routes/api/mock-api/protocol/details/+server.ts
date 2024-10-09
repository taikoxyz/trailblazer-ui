import type { RequestHandler } from '@sveltejs/kit';

import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';

const protocolDetails: Record<string, ProtocolApiResponse> = {
  'mock-slug1': {
    protocols: [
      { address: '0xMockAddress1', score: 1000 },
      { address: '0xMockAddress2', score: 2000 },
    ],
  },
  'mock-slug2': {
    protocols: [
      { address: '0xMockAddress3', score: 3000 },
      { address: '0xMockAddress4', score: 4000 },
    ],
  },
  'mock-slug3': {
    protocols: [
      { address: '0xMockAddress5', score: 5000 },
      { address: '0xMockAddress6', score: 6000 },
    ],
  },
  'mock-slug4': {
    protocols: [
      { address: '0xMockAddress7', score: 7000 },
      { address: '0xMockAddress8', score: 8000 },
    ],
  },
};

export const GET: RequestHandler = async ({ url }) => {
  const slug = url.searchParams.get('slug');

  if (slug && protocolDetails[slug]) {
    return new Response(JSON.stringify(protocolDetails[slug]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ error: 'Protocol not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

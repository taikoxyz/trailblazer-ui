import type { RequestHandler } from '@sveltejs/kit';

import type { ProtocolApiResponse } from '$lib/domains/leaderboard/dto/protocol.dto';

const protocolDetails: Record<string, ProtocolApiResponse> = {
  'mock-slug1': {
    protocols: [
      { address: '0xMockAddress1', score: 1000 },
      { address: '0xMockAddress2', score: 2000 },
    ],
    metadata: {
      logo: 'https://placehold.co/48x48/6366f1/ffffff?text=M1',
      name: 'Mock DEX Protocol',
      twitter: 'https://twitter.com/mockdex',
      slug: 'mock-slug1',
    },
  },
  'mock-slug2': {
    protocols: [
      { address: '0xMockAddress3', score: 3000 },
      { address: '0xMockAddress4', score: 4000 },
    ],
    metadata: {
      logo: 'https://placehold.co/48x48/8b5cf6/ffffff?text=M2',
      name: 'Mock Lending Protocol',
      twitter: 'https://twitter.com/mocklending',
      slug: 'mock-slug2',
    },
  },
  'mock-slug3': {
    protocols: [
      { address: '0xMockAddress5', score: 5000 },
      { address: '0xMockAddress6', score: 6000 },
    ],
    metadata: {
      logo: 'https://placehold.co/48x48/06b6d4/ffffff?text=M3',
      name: 'Mock Gaming Protocol',
      twitter: 'https://twitter.com/mockgaming',
      slug: 'mock-slug3',
    },
  },
  'mock-slug4': {
    protocols: [
      { address: '0xMockAddress7', score: 7000 },
      { address: '0xMockAddress8', score: 8000 },
    ],
    metadata: {
      logo: 'https://placehold.co/48x48/10b981/ffffff?text=M4',
      name: 'Mock Bridge Protocol',
      twitter: 'https://twitter.com/mockbridge',
      slug: 'mock-slug4',
    },
  },
};

// Function to generate fallback protocol data for unknown slugs
function generateFallbackProtocol(slug: string): ProtocolApiResponse {
  const slugNumber = slug.replace(/\D/g, '') || '0'; // Extract numbers from slug
  const colorIndex = parseInt(slugNumber) % 6;
  const colors = ['6366f1', '8b5cf6', '06b6d4', '10b981', 'f59e0b', 'ef4444'];

  return {
    protocols: [
      { address: `0xMock${slugNumber}Address1`, score: 500 + parseInt(slugNumber) * 100 },
      { address: `0xMock${slugNumber}Address2`, score: 1000 + parseInt(slugNumber) * 200 },
    ],
    metadata: {
      logo: `https://placehold.co/48x48/${colors[colorIndex]}/ffffff?text=${slug.slice(-2).toUpperCase()}`,
      name: `Mock ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} Protocol`,
      twitter: `https://twitter.com/${slug}`,
      slug: slug,
    },
  };
}

export const GET: RequestHandler = async ({ url }) => {
  // Edition parameter is available in params but not used in this mock
  const slug = url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Try to get predefined protocol details, or generate fallback data
  const details = protocolDetails[slug] || generateFallbackProtocol(slug);

  return new Response(JSON.stringify(details), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

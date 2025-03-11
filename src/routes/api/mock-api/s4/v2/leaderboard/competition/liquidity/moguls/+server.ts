import type { RequestHandler } from '@sveltejs/kit';
import type { Address } from 'viem';

import type { LiquidityLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/liqudity.dto';

export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get('address');
  let filteredData = mockData;
  if (address && mockData.data.items) {
    filteredData = {
      ...mockData,
      data: {
        ...mockData.data,
        items: mockData.data.items.filter((item) => item.address === address),
        total: 1,
        visible: 1,
      },
    };
  }

  return new Response(JSON.stringify(filteredData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const generateRandomAddress = (): Address => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address as Address;
};

const generateRandomScore = () => {
  return Math.random() * 10000000 + 10000000; // Random score between 10,000,000 and 20,000,000
};

const mockData: LiquidityLeaderboardPageApiResponse = {
  data: {
    items: Array.from({ length: 110 }, (_, i) => ({
      address: generateRandomAddress(),
      score: generateRandomScore(),
      rank: i + 1,
    })),
    page: 0,
    size: 20,
    max_page: 5,
    total_pages: 6,
    total: 110,
    last: 1,
    first: 0,
    visible: 20,
  },
  lastUpdated: 1724040243,
};

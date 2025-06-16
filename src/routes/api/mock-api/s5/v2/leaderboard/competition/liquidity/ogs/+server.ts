import type { RequestHandler } from '@sveltejs/kit';
import type { Address } from 'viem';

import { leaderboardConfig } from '$config';
import type { LiquidityLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/liqudity.dto';

export const GET: RequestHandler = async ({ url }) => {
  const address = url.searchParams.get('address');
  const page = Number(url.searchParams.get('page')) || 0;
  const sizeParam = url.searchParams.get('size');
  const size = sizeParam ? Number(sizeParam) : leaderboardConfig.pageSizeLarge;

  if (address) {
    // For testing, return a random entry from the top 10 when an address is provided
    const randomIndex = Math.floor(Math.random() * 10);
    const filteredData = {
      ...mockData,
      data: {
        ...mockData.data,
        page: 0,
        size: 1,
        items: mockData.data.items ? [mockData.data.items[randomIndex]] : [],
        total: 1,
        visible: 1,
      },
    } as LiquidityLeaderboardPageApiResponse;
    return new Response(JSON.stringify(filteredData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const total = mockData.data.items ? mockData.data.items.length : 0;
    const pagedItems = mockData.data.items ? mockData.data.items.slice(page * size, page * size + size) : [];
    const paginatedData = {
      ...mockData,
      data: {
        ...mockData.data,
        page,
        size, // Ensure we're using the size from URL parameter
        items: pagedItems,
        total,
        visible: pagedItems.length,
        total_pages: Math.ceil(total / size),
        max_page: Math.ceil(total / size) - 1,
        first: page * size,
        last: Math.min(page * size + pagedItems.length - 1, total - 1),
      },
    } as LiquidityLeaderboardPageApiResponse;
    return new Response(JSON.stringify(paginatedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

const generateRandomAddress = (): Address => {
  const chars = '0123456789abcdef';
  let address = '0x55555'; // Make S5 addresses easily identifiable with '55555' prefix
  for (let i = 0; i < 35; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address as Address;
};

const generateRandomScore = () => {
  return Math.random() * 5000000 + 50000000; // Different score range for S5 (50M-55M vs 10M-20M)
};

const mockData: LiquidityLeaderboardPageApiResponse = {
  data: {
    items: Array.from({ length: 200 }, (_, i) => ({
      // Reduce to 200 items for S5 to make it different
      address: generateRandomAddress(),
      score: generateRandomScore(),
      rank: i + 1,
    })),
    page: 0,
    size: leaderboardConfig.pageSizeLarge,
    total: 200, // Update total to match
    visible: leaderboardConfig.pageSize,
    total_pages: Math.ceil(200 / leaderboardConfig.pageSizeLarge),
    max_page: Math.ceil(200 / leaderboardConfig.pageSizeLarge),
    first: 0,
    last: leaderboardConfig.pageSize - 1,
  },
  lastUpdated: Date.now(),
};

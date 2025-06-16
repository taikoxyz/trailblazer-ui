import type { RequestHandler } from '@sveltejs/kit';

import type { UserLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/user.dto';

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(mockData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const mockData: UserLeaderboardPageApiResponse = {
  data: {
    items: [
      {
        address: '0x5555C7506e84335c0e5761a7a6Ff368cdD94CA37',
        score: 5504250,
        rank: 11,
      },
      {
        address: '0x5555240790323a62cc151aD39c4EC5c95d6eF8467',
        score: 5503533,
        rank: 12,
      },
      {
        address: '0x5555f57868F7499054F392A8676ceB8dBEeD6D433',
        score: 5502715,
        rank: 13,
      },
      {
        address: '0x5555136677295ecc6d3eebe3F43c1d16aC5dfe15',
        score: 5500144,
        rank: 14,
      },
      {
        address: '0x5555E1f237e60205585CcD1339D335bCdfF5cB97',
        score: 5498207,
        rank: 15,
      },
      {
        address: '0x55554dA7b2fc2278E08702459d1d9Aa56A2E9385e',
        score: 5496126,
        rank: 16,
      },
      {
        address: '0x555504Bc7379FAAbc0bE0421DA74191ea51713c8c',
        score: 5494864,
        rank: 17,
      },
      {
        address: '0x55556EC0f671B37ac51ad6ce7972d1fd81F3CDa75',
        score: 5493625,
        rank: 18,
      },
    ],
    page: 0,
    size: 20,
    max_page: 2500,
    total_pages: 2501,
    total: 50020,
    last: 1,
    first: 0,
    visible: 20,
  },
  lastUpdated: 1724040243,
};

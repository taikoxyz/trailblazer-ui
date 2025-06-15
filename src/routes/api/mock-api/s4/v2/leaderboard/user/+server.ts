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
        address: '0x4444C7506e84335c0e5761a7a6Ff368cdD94CA37',
        score: 4404250,
        rank: 11,
      },
      {
        address: '0x4444240790323a62cc151aD39c4EC5c95d6eF8467',
        score: 4403533,
        rank: 12,
      },
      {
        address: '0x4444f57868F7499054F392A8676ceB8dBEeD6D433',
        score: 4402715,
        rank: 13,
      },
      {
        address: '0x4444136677295ecc6d3eebe3F43c1d16aC5dfe15',
        score: 4400144,
        rank: 14,
      },
      {
        address: '0x4444E1f237e60205585CcD1339D335bCdfF5cB97',
        score: 4398207,
        rank: 15,
      },
      {
        address: '0x44444dA7b2fc2278E08702459d1d9Aa56A2E9385e',
        score: 4396126,
        rank: 16,
      },
      {
        address: '0x444404Bc7379FAAbc0bE0421DA74191ea51713c8c',
        score: 4394864,
        rank: 17,
      },
      {
        address: '0x44446EC0f671B37ac51ad6ce7972d1fd81F3CDa75',
        score: 4393625,
        rank: 18,
      },
    ],
    page: 0,
    size: 20,
    max_page: 2000,
    total_pages: 2001,
    total: 40020,
    last: 1,
    first: 0,
    visible: 20,
  },
  lastUpdated: 1724040243,
};

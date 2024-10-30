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
  lastUpdated: 1724040243,
  data: {
    items: [
      {
        address: '0x1234C7506e84335c0e5761a7a6Ff368cdD94CA37',
        score: 14042501.1762425,
        rank: 11,
      },
      {
        address: '0x079240790323a62cc151aD39c4EC5c95d6eF8467',
        score: 14035331.25868919,
        rank: 12,
      },
      {
        address: '0x438f57868F7499054F392A8676ceB8dBEeD6D433',
        score: 14027158.678825753,
        rank: 13,
      },
      {
        address: '0xcf30136677295ecc6d3eebe3F43c1d16aC5dfe15',
        score: 14001448.008159276,
        rank: 14,
      },
      {
        address: '0xf9B2E1f237e60205585CcD1339D335bCdfF5cB97',
        score: 13982075.076911682,
        rank: 15,
      },
      {
        address: '0x7204dA7b2fc2278E08702459d1d9Aa56A2E9385e',
        score: 13961269.589855224,
        rank: 16,
      },
      {
        address: '0x25A04Bc7379FAAbc0bE0421DA74191ea51713c8c',
        score: 13948648.735392606,
        rank: 17,
      },
      {
        address: '0xa6A4EC0f671B37ac51ad6ce7972d1fd81F3CDa75',
        score: 13936250.491539374,
        rank: 18,
      },
    ],
    page: 0,
    size: 20,
    max_page: 39031,
    total_pages: 39032,
    total: 780626,
    last: 1,
    first: 0,
    visible: 20,
  },
};

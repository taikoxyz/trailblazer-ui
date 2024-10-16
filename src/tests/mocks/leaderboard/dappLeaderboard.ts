import type { DappLeaderboardPageApiResponse } from '$lib/domains/leaderboard/dto/dapps.dto';

export const MOCK_DAPP_LEADERBOARD: DappLeaderboardPageApiResponse = {
  lastUpdated: 1709294400,
  data: {
    items: [
      {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        slug: 'dapp-one',
        score: 100,
        rank: 1,
      },
      {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        slug: 'dapp-two',
        score: 200,
        rank: 2,
      },
      {
        address: '0x7890abcdef1234567890abcdef1234567890abcd',
        slug: 'dapp-three',
        score: 300,
        rank: 3,
      },
      {
        address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        slug: 'dapp-four',
        score: 400,
        rank: 4,
      },
      {
        address: '0x1234567890abcdefabcdefabcdefabcdefabcdef',
        slug: 'dapp-five',
        score: 500,
        rank: 5,
      },
    ],
    page: 0,
    size: 5,
    total: 5,
    total_pages: 1,
    max_page: 0,
    last: 1,
    first: 0,
    visible: 5,
  },
};

export const MOCK_DAPP_DETAILS = {
  protocols: [
    {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      score: 100,
    },
  ],
};

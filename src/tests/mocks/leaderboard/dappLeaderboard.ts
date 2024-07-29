import type { DappLeaderboardPageApiResponse } from '$libs/leaderboard';

export const MOCK_DAPP_LEADERBOARD: DappLeaderboardPageApiResponse = {
  lastUpdated: 1709294400,
  items: [
    {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      slug: 'dapp-one',
      score: 100,
    },
    {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      slug: 'dapp-two',
      score: 200,
    },
    {
      address: '0x7890abcdef1234567890abcdef1234567890abcd',
      slug: 'dapp-three',
      score: 300,
    },
    {
      address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      slug: 'dapp-four',
      score: 400,
    },
    {
      address: '0x1234567890abcdefabcdefabcdefabcdefabcdef',
      slug: 'dapp-five',
      score: 500,
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
};

export const MOCK_DAPP_DETAILS = {
  protocols: [
    {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      score: 100,
    },
  ],
};

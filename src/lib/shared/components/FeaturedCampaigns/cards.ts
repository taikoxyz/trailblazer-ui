import type { CampaignCardType } from './types';

export const cards: CampaignCardType[] = [
  {
    title: 'Liquidity Royale Season 5',
    text: 'Compete, conquer and earn! 700k TAIKO tokens are up for grabs!',
    btn: {
      text: 'Earn now',
      external: false,
      destination: '/leaderboard/liquidity/4',
    },
    images: {
      sm: '/campaign/cards/sm/lr-s5.png',
      md: '/campaign/cards/xl/lr-s5.png',
      lg: '/campaign/cards/xl/lr-s5.png',
      xl: '/campaign/cards/xl/lr-s5.png',
    },
  },
  {
    title: 'Blaze new trails with Thrillblazer Edition 7',
    text: 'Blaze new trails, fuel Taiko’s momentum, and seize your chance for legendary rewards.',
    btn: {
      text: 'Earn now',
      external: false,
      destination: '/leaderboard/thrillblazers/7',
    },
    images: {
      sm: '/campaign/cards/sm/thrillblazer.png',
      md: '/campaign/cards/xl/thrillblazer.png',
      lg: '/campaign/cards/xl/thrillblazer.png',
      xl: '/campaign/cards/xl/thrillblazer.png',
    },
  },
];

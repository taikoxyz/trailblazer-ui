import type { CampaignCardType } from './types';

export const cards: CampaignCardType[] = [
  {
    title: 'Weekly Bonus Points',
    text: 'You can earn weekly trailblazer points by simply holding your TAIKO tokens!',
    btn: {
      text: 'Learn more',
      external: true,
      destination: `https://taiko.mirror.xyz/SfIbIBBE1fDs2IjD4AxgK9r8IFi5LiqzsGpjb3sChIM`,
    },
    images: {
      sm: '/campaign/cards/sm/status.png',
      md: '/campaign/cards/xl/status.png',
      lg: '/campaign/cards/xl/status.png',
      xl: '/campaign/cards/xl/status.png',
    },
  },
  {
    title: 'Blaze new trails with Thrillblazer Edition 8',
    text: 'Blaze new trails, fuel Taiko’s momentum, and seize your chance for legendary rewards.',
    btn: {
      text: 'Earn now',
      external: false,
      destination: '/leaderboard/thrillblazers/8',
    },
    images: {
      sm: '/campaign/cards/sm/thrillblazer.png',
      md: '/campaign/cards/xl/thrillblazer.png',
      lg: '/campaign/cards/xl/thrillblazer.png',
      xl: '/campaign/cards/xl/thrillblazer.png',
    },
  },
];

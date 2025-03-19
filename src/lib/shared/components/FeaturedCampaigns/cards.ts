import type { CampaignCardType } from './types';

export const cards: CampaignCardType[] = [
  {
    title: 'New look, who ‘dis?',
    text: 'New badge recruitment is live! Join the Devs and recruit fresh faces to your faction today!',
    btn: {
      text: 'Recruit now',
      external: false,
      destination: `profile/`,
    },
    images: {
      sm: '/campaign/cards/sm/newNft.png',
      md: '/campaign/cards/xl/newNft.png',
      lg: '/campaign/cards/xl/newNft.png',
      xl: '/campaign/cards/xl/newNft.png',
    },
  },
  {
    title: 'Blaze new trails with Thrillblazer S4',
    text: 'Blaze new trails, fuel Taiko’s momentum, and seize your chance for legendary rewards.',
    btn: {
      text: 'Earn now',
      external: false,
      destination: 'journeys/thrillblazer/4',
    },
    images: {
      sm: '/campaign/cards/sm/thrillblazer.png',
      md: '/campaign/cards/xl/thrillblazer.png',
      lg: '/campaign/cards/xl/thrillblazer.png',
      xl: '/campaign/cards/xl/thrillblazer.png',
    },
  },
  {
    title: 'Liquidity Royale Season 4',
    text: 'Compete, conquer and earn! 1 Million TAIKO tokens are up for grabs!',
    btn: {
      text: 'Earn now',
      external: false,
      destination: 'journeys/liquidity/3',
    },
    images: {
      sm: '/campaign/cards/sm/liquidity-royale.png',
      md: '/campaign/cards/xl/liquidity-royale.png',
      lg: '/campaign/cards/xl/liquidity-royale.png',
      xl: '/campaign/cards/xl/liquidity-royale.png',
    },
  },
];

import type { CampaignCardType } from './types';

export const cards: CampaignCardType[] = [
  {
    title: 'Evolve your Faction Badges',
    text: 'The Devs are out in full force looking for new recruits to join their Faction. Will you join them?',
    btn: {
      text: 'Recruit now',
      external: false,
      destination: `profile/`,
    },
    images: {
      sm: '/campaign/cards/sm/recruit.png',
      md: '/campaign/cards/xl/recruit.png',
      lg: '/campaign/cards/xl/recruit.png',
      xl: '/campaign/cards/xl/recruit.png',
    },
  },
  {
    title: 'Liquidity Royale Season 3',
    text: 'Supercharge your liquidity and get rewarded for it. Season 3 is offering a massive 1.2M TAIKO tokens!',
    btn: {
      text: 'Earn now',
      external: false,
      destination: 'journeys/liquidity',
    },
    images: {
      sm: '/campaign/cards/sm/liquidity-royale.png',
      md: '/campaign/cards/xl/liquidity-royale.png',
      lg: '/campaign/cards/xl/liquidity-royale.png',
      xl: '/campaign/cards/xl/liquidity-royale.png',
    },
  },
];

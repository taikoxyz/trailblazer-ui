import type { CampaignCardType } from './types';

export const cards: CampaignCardType[] = [
  {
    title: 'TAKOTAKO Tales x Taiko',
    text: 'Score 8,888 TAIKO and a Taikoon. Join the TAKOTAKO Galxe campaign and complete tasks.',
    btn: {
      text: 'Join now',
      external: true,
      destination: `https://app.galxe.com/quest/VnWkqAtB2Row8KdwpFHW9n/GC6MbtpuTp`,
    },
    images: {
      sm: '/campaign/cards/sm/takotako.png',
      md: '/campaign/cards/xl/takotako.png',
      lg: '/campaign/cards/xl/takotako.png',
      xl: '/campaign/cards/xl/takotako.png',
    },
  },
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

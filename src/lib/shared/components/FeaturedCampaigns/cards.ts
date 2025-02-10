import type { CampaignCardType } from './types';

export const cards: CampaignCardType[] = [
  {
    title: 'Claim your 50K points now!',
    text: 'Vote for your favorite projects on DoraHacks. Don’t miss out—claim your 50,000 points today!',
    btn: {
      text: 'Vote now',
      external: true,
      destination: 'https://dorahacks.io/grant/taiko/buidl',
    },
    images: {
      sm: '/campaign/cards/sm/dorahacks.png',
      md: '/campaign/cards/xl/dorahacks.png',
      lg: '/campaign/cards/xl/dorahacks.png',
      xl: '/campaign/cards/xl/dorahacks.png',
    },
  },
  {
    title: 'Avalon x Taiko: Exclusive rewards await',
    text: 'Supply TAIKO on Avalon to unlock airdrops, 100K TAIKO incentives, and 100x Trailblazers XP! ⏳',
    btn: {
      text: 'Earn now',
      external: true,
      destination: 'https://usdalend.avalonfinance.xyz/?marketName=proto_usda_taiko_v3',
    },
    images: {
      sm: '/campaign/cards/sm/avalon.png',
      md: '/campaign/cards/sm/avalon.png',
      lg: '/campaign/cards/sm/avalon.png',
      xl: '/campaign/cards/sm/avalon.png',
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

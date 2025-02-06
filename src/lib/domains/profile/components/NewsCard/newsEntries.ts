import { zeroAddress } from 'viem';

import getConnectedAddress from '$shared/utils/getConnectedAddress';

import type { NewsCardContent } from '../../types/NewsCardContent';

const profilePath = (slug: string) => {
  const address = getConnectedAddress();
  return address && address !== zeroAddress ? `${address}${slug}` : '';
};

export const newsEntries: NewsCardContent[] = [
  {
    featured: true,
    title: 'Dorahacks Vote',
    subtitle: 'Vote now!',
    text: 'Claim your 50k points by voting for your favorite projects',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://dorahacks.io/grant/taiko/buidl',
      external: true,
    },
  },
  {
    title: 'Avalon Airdrop',
    subtitle: 'Live now!',
    text: 'Claim on Taiko for 100x your TX value and points!',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://avl.avalonfinance.xyz/airdrop/',
      external: true,
    },
  },
  {
    title: 'Season 2 Claim',
    subtitle: 'has ended.',
    cta: {
      href: profilePath('#claim'),
    },
    imgSrc: '/news/flame.svg',
  },
  {
    title: 'Get your Badges',
    subtitle: 'Recruit your members to your cause',
    cta: {
      href: profilePath('#badge-recruitment'),
    },
  },

  {
    title: 'Liquidity Royale',
    subtitle: 'Supercharge your liquidity and get rewarded for it',
    cta: {
      href: '/journeys/liquidity',
    },
  },
];

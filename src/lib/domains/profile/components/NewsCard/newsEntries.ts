import { zeroAddress } from 'viem';

import type { NewsCardContent } from '$lib/domains/profile/types/NewsCardContent';
import getConnectedAddress from '$shared/utils/getConnectedAddress';

const profilePath = (slug: string) => {
  const address = getConnectedAddress();
  return address && address !== zeroAddress ? `${address}${slug}` : '';
};

export const newsEntries: NewsCardContent[] = [
  {
    featured: true,
    title: 'TakoTako Tales',
    subtitle: 'Join now!',
    text: 'The based DeFi Quest - Score 8,888 TAIKO and a Taikoon.',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://app.galxe.com/quest/VnWkqAtB2Row8KdwpFHW9n/GC6MbtpuTp',
      external: true,
    },
  },
  {
    featured: false,
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

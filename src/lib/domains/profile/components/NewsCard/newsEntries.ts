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
    title: 'Season 4 is here!',
    subtitle: 'Join now!',
    text: 'Blaze new trails, fuel Taiko’s momentum, and seize your chance for legendary rewards.',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://taiko.mirror.xyz/6vLNVZ3pgFFenboNt1dD2gwGWwYBnweTu85V30B_CGc',
      external: true,
    },
  },
  {
    title: 'Liquidity Royale Season 4',
    subtitle: 'Supercharge your liquidity and get rewarded for it',
    cta: {
      href: '/journeys/liquidity/3',
    },
  },
  {
    title: 'Refreshed Badge recruitment',
    subtitle: 'Recruit your members to your cause',
    cta: {
      href: profilePath('#badge-recruitment'),
    },
  },
];

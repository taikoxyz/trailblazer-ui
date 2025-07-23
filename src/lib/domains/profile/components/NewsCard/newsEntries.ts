import type { NewsCardContent } from '$lib/domains/profile/types/NewsCardContent';

// const profilePath = (slug: string) => {
//   const address = getConnectedAddress();
//   return address && address !== zeroAddress ? `${address}${slug}` : '';
// };

export const newsEntries: NewsCardContent[] = [
  {
    featured: true,
    title: 'Claim your rewards',
    subtitle: 'Season 4 rewards are waiting for you!',
    text: 'If you participated in Season 4, make sure to claim your rewards before they expire.',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://taiko.mirror.xyz/oqAfmnmsWpGsVC89GtIbPDreDv5c37JXx0m2_N5edB8',
      external: true,
    },
  },
  {
    featured: false,
    title: 'Season 5 is here!',
    subtitle: 'Join now!',
    text: 'Blaze new trails, fuel Taiko’s momentum, and seize your chance for legendary rewards.',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://taiko.mirror.xyz/Bpu-YUgJXSoZRD-rGfsFVr-cb7QyI-6pn2GfJCuKNFc',
      external: true,
    },
  },
  {
    title: 'Liquidity Royale Season 5',
    subtitle: 'Supercharge your liquidity and get rewarded for it',
    cta: {
      href: '/leaderboard/liquidity/4',
    },
  },
];

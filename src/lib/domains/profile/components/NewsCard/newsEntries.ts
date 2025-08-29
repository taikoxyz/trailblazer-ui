import type { NewsCardContent } from '$lib/domains/profile/types/NewsCardContent';

// const profilePath = (slug: string) => {
//   const address = getConnectedAddress();
//   return address && address !== zeroAddress ? `${address}${slug}` : '';
// };

export const newsEntries: NewsCardContent[] = [
  {
    featured: true,
    title: 'Season 5 is here!',
    subtitle: 'Join now!',
    text: 'Blaze new trails, fuel Taiko’s momentum, and seize your chance for legendary rewards.',
    imgSrc: '/news/flame.svg',
    cta: {
      href: 'https://taiko.mirror.xyz/Bpu-YUgJXSoZRD-rGfsFVr-cb7QyI-6pn2GfJCuKNFc',
      external: true,
    },
  },
];

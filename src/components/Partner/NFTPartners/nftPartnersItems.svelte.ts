import type { CarouselItemType } from '$components/Carousel/types';

import { t } from 'svelte-i18n';
import { get } from 'svelte/store';

export const nftPartnersItems: CarouselItemType[] = [
  {
    id: '1',
    title: get(t)('partners.nft.okx.title'),
    description: get(t)('partners.nft.okx.description'),
    image: '/dapps/nft/okx-marketplace.webp',
    link: 'https://www.okx.com/web3/marketplace/nft',
    cta: get(t)('partners.common.useNow'),
  },
  {
    id: '2',
    title: get(t)('partners.nft.mintpad.title'),
    description: get(t)('partners.nft.mintpad.description'),
    image: '/dapps/nft/mintpad.jpeg',
    link: 'https://www.mintpad.co/',
    cta: get(t)('partners.common.useNow'),
  },
  {
    id: '3',
    title: get(t)('partners.nft.conft.title'),
    description: get(t)('partners.nft.conft.description'),
    image: '/dapps/nft/conft.jpg',
    link: 'https://conft.app/',
    cta: get(t)('partners.common.useNow'),
  },
  {
    id: '4',
    title: get(t)('partners.nft.loopex.title'),
    description: get(t)('partners.nft.loopex.description'),
    image: '/dapps/nft/loopex.jpg',
    link: 'https://taiko.loopexchange.io/',
    cta: get(t)('partners.common.useNow'),
  },
  {
    id: '5',
    title: get(t)('partners.nft.nfts2me.title'),
    description: get(t)('partners.nft.nfts2me.description'),
    image: '/dapps/nft/nfts2me.png',
    link: 'https://nfts2me.com/app/',
    cta: get(t)('partners.common.useNow'),
  },
  {
    id: '6',
    title: get(t)('partners.nft.omnihub.title'),
    description: get(t)('partners.nft.omnihub.description'),
    image: '/dapps/nft/omnihub.png',
    link: 'https://omnihub.xyz/',
    cta: get(t)('partners.common.useNow'),
  },
];

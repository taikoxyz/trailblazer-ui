<script lang="ts">
  import PartnerCarousel from './Template/PartnerCarousel.template.svelte';
  import type { PartnerCarouselItem } from './Template/types';

  const partners: PartnerCarouselItem[] = [
    {
      title: 'Panko',
      description: 'Deep liquidity and top-class execution for native assets with permissionless...',
      imageSrc: '/dapps/defi/panko.png',
      imageAlt: 'Panko logo',
      tagText: 'Dex',
      buttonText: 'Earn more',
      buttonLink: 'https://panko.finance/farms',
    },
    {
      title: 'TakoTako',
      description: 'Serving the freshest lending and borrowing opportunities.',
      imageSrc: '/dapps/defi/takotako.png',
      imageAlt: 'Takotako logo',
      tagText: 'Dex',
      buttonText: 'Earn more',
      buttonLink: 'https://www.takotako.xyz',
    },
  ];
</script>

<PartnerCarousel carouselItems={partners} title="Explore DeFi projects" />

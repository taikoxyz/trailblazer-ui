<script lang="ts">
  import { t } from 'svelte-i18n';

  import PartnerCarousel from './Template/PartnerCarousel.template.svelte';
  import type { PartnerCarouselItem } from './Template/types';

  const partners: PartnerCarouselItem[] = [
    {
      title: 'Panko',
      description: 'Deep liquidity and top-class execution for native assets with permissionless pools.',
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

  const headline = $t('leaderboard.liquidityRoyale.carousel.headline');
  const title = $t('leaderboard.liquidityRoyale.carousel.title');
  const description = $t('leaderboard.liquidityRoyale.carousel.description');
</script>

<PartnerCarousel carouselItems={partners} {title} {headline} {description} />

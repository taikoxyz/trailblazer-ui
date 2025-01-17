<script lang="ts">
  import { t } from 'svelte-i18n';

  import PartnerCarousel from './Template/PartnerCarousel.template.svelte';
  import type { PartnerCarouselItem } from './Template/types';

  const partners: PartnerCarouselItem[] = [
    {
      title: 'LayerBank',
      description: 'The decentralized universal liquidity hub designed for all chains',
      imageSrc: '/dapps/defi/layerbank.svg',
      imageAlt: 'LayerBank logo',
      tagText: 'Lending',
      buttonText: 'Borrow now',
      buttonLink: 'https://app.layerbank.finance/taiko/bank/',
    },
    {
      title: 'Avalon',
      description: 'The Hub of BTCFi - Borrow stablecoins against your BTC.',
      imageSrc: '/dapps/defi/avalon.svg',
      imageAlt: 'Avalon logo',
      tagText: 'Lending',
      buttonText: 'Borrow now',
      buttonLink: 'https://www.avalonfinance.xyz/',
    },
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
    {
      title: 'Unagi',
      description: 'State-of-the-art trading solutions and liquidity management powered by DODO',
      imageSrc: '/dapps/defi/unagi.svg',
      imageAlt: 'Unagi logo',
      tagText: 'Dex',
      buttonText: 'Earn now',
      buttonLink: 'https://www.avalonfinance.xyz/',
    },
  ];

  const headline = $t('leaderboard.liquidityRoyale.carousel.headline');
  const title = $t('leaderboard.liquidityRoyale.carousel.title');
  const description = $t('leaderboard.liquidityRoyale.carousel.description');
</script>

<!-- NOTE: due to only having two cards initially, these are duplicated to behave like an infinite carousel -->
<PartnerCarousel carouselItems={[...partners, ...partners]} {title} {headline} {description} />

<script lang="ts">
  import PartnerCarousel from './Template/PartnerCarousel.template.svelte';
  import type { PartnerCarouselItem } from './Template/types';

  const partners: PartnerCarouselItem[] = [
    {
      title: 'Robinos',
      description: 'Robinos leverages smart contracts and blockchain technology to create...',
      imageSrc: '/dapps/robinos.png',
      imageAlt: 'Robinos logo',
      tagText: 'DeFi',
      buttonText: 'Earn more',
    },
  ];
</script>

<PartnerCarousel carouselItems={partners} title="Boost your Taiko score" />

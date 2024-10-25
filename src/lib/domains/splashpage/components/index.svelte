<script lang="ts">
  import { EcosystemSection } from '$lib/domains/ecosystem/components/index';
  import BannerCarousel from '$lib/domains/splashpage/components/Banner/BannerCarousel.svelte';
  import S1ClaimBanner from '$lib/domains/splashpage/components/Banner/S1ClaimBanner.svelte';
  import S2StartBanner from '$lib/domains/splashpage/components/Banner/S2StartBanner.svelte';
  import type { Slide } from '$lib/domains/splashpage/components/Banner/types';
  import FeaturedCampaigns from '$shared/components/FeaturedCampaigns/FeaturedCampaigns.svelte';
  import { classNames } from '$shared/utils/classNames';

  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import TrailblazerMain from './HeroSection/HeroSection.svelte';
  import { RankUp } from './RankUp';

  const wrapperClasses = classNames(
    'f-center',
    'flex-col',
    'w-full',
    'overflow-visible',
    'gap-[150px]',
    'md:mb-[130px]',
    'md:px-[48px]',
    'px-[24px]',
  );

  const separatorBaseClasses = classNames('container', 'w-full', 'mt-[-150px]', 'mb-[-150px]');
  const separator40pxClasses = classNames(separatorBaseClasses, 'h-[40px]');

  const separator120pxClasses = classNames(separatorBaseClasses, 'h-[120px]');

  const slides: Slide[] = [
    {
      component: S1ClaimBanner,
    },
    {
      component: S2StartBanner,
    },
  ];
</script>

<div class={wrapperClasses}>
  <TrailblazerMain />
  <div class={separator40pxClasses} />

  <TrailblazerGuide />

  <FeaturedCampaigns />

  <BannerCarousel interval={5000} transitionDuration={700} transitionDistance={200} {slides} withDots />

  <div class={separator120pxClasses} />

  <Factions />

  <RankUp />

  <EcosystemSection />
</div>

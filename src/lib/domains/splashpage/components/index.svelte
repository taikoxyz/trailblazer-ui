<script lang="ts">
  import { EcosystemSection } from '$lib/domains/ecosystem/components/index';
  import BannerCarousel from '$lib/domains/splashpage/components/Banner/BannerCarousel.svelte';
  import S4StartBanner from '$lib/domains/splashpage/components/Banner/S4StartBanner.svelte';
  import type { Slide } from '$lib/domains/splashpage/components/Banner/types';
  import FeaturedCampaigns from '$shared/components/FeaturedCampaigns/FeaturedCampaigns.svelte';
  import { classNames } from '$shared/utils/classNames';

  import S3ClaimBanner from './Banner/S3ClaimBanner.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import HeroSection from './HeroSection/HeroSection.svelte';
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
      component: S3ClaimBanner,
      url: 'profile',
    },
    {
      component: S4StartBanner,
    },
  ];
</script>

<div class={wrapperClasses}>
  <HeroSection />
  <div class={separator40pxClasses} />

  <FeaturedCampaigns title="Featured campaigns" />

  <BannerCarousel interval={5000} transitionDuration={700} transitionDistance={200} {slides} withDots />

  <TrailblazerGuide />

  <div class={separator120pxClasses} />

  <Factions />

  <RankUp />

  <EcosystemSection />
</div>

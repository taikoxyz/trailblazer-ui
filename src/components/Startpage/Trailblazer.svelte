<script lang="ts">
  import { StargateBanner } from '$components/Banner';
  import GamingBanner from '$components/Banner/Trailbanner/GamingBanner.svelte';
  import { Countdown } from '$components/Countdown';
  import EcosystemSection from '$components/Ecosystem/EcosystemSection.svelte';
  import { GamingPartners } from '$components/Partner/GamingPartners';
  import { StargatePartners } from '$components/Partner/StargatePartners';
  import { classNames } from '$libs/util/classNames';

  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';

  const wrapperClasses = classNames(
    'f-center',
    'container',
    'flex-col',
    'w-full',
    'overflow-visible',
    'gap-[150px]',
    'md:mb-[130px]',
  );
  const separatorClasses = classNames('w-full', 'h-[1px]', 'bg-[#444A55]');
  const paddingWrapperClasses = classNames(
    'w-full',
    'px-[40px]',
    'lg:px-[57px]',

    'md:px-[47px]',
  );

  const separatorBaseClasses = classNames('w-full', 'mt-[-150px]', 'mb-[-150px]');
  const separator40pxClasses = classNames(separatorBaseClasses, 'h-[40px]');

  const separator80pxClasses = classNames(separatorBaseClasses, 'h-[80px]');

  const separator120pxClasses = classNames(separatorBaseClasses, 'h-[120px]');
</script>

<div class={wrapperClasses}>
  <TrailblazerMain />
  <div class={separator40pxClasses} />
  <TrailblazerGuide />
  <Countdown countdown={new Date(Date.UTC(2024, 8, 16, 23, 59, 59))} />

  <StargateBanner />

  <div class={separator80pxClasses} />

  <StargatePartners />
  <div class={paddingWrapperClasses}>
    <div class={separatorClasses} />
  </div>
  <GamingBanner />
  <div class={separator80pxClasses} />

  <GamingPartners />

  <div class={separator120pxClasses} />

  <Factions />

  <RankUp />

  <EcosystemSection />

  <ExploreEcosystem />
</div>

<script lang="ts">
  import { StargateBanner } from '$components/Banner';
  import GamingBanner from '$components/Banner/Trailbanner/GamingBanner.svelte';
  import { Countdown } from '$components/Countdown';
  import EcosystemSection from '$components/Ecosystem/EcosystemSection.svelte';
  import DefiPartners from '$components/Partner/DefiPartners/DefiPartners.svelte';
  import { ENSPartners } from '$components/Partner/ENSPartners';
  import { GamingPartners } from '$components/Partner/GamingPartners';
  import { StargatePartners } from '$components/Partner/StargatePartners';
  import { classNames } from '$libs/util/classNames';

  import DividerElement from './DividerElement/DividerElement.svelte';
  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';

  const separatorClasses = classNames('w-full', 'h-[1px]', 'bg-[#444A55]');
  const guideWrapperClasses = classNames('w-full', 'relative', 'top-[-40px]');
  const paddingWrapperClasses = classNames('w-full', 'px-[40px]', 'lg:px-[57px]', 'md:px-[47px]');
</script>

<div class="f-center container flex-col w-full overflow-visible gap-[100px] md:mb-[130px]">
  <TrailblazerMain />
  <div class={guideWrapperClasses}>
    <TrailblazerGuide />
  </div>
  <div class={guideWrapperClasses}>
    <Countdown countdown={new Date('2024-09-16')} />
  </div>

  <div class={paddingWrapperClasses}>
    <StargateBanner />
  </div>
  <StargatePartners />
  <div class={paddingWrapperClasses}>
    <div class={separatorClasses} />
  </div>
  <div class={paddingWrapperClasses}>
    <GamingBanner />
  </div>
  <div class={paddingWrapperClasses}>
    <GamingPartners />
  </div>
  <Factions />
  <DividerElement />

  <EcosystemSection />
  <div class={paddingWrapperClasses}>
    <DefiPartners />
  </div>
  <div class={paddingWrapperClasses}>
    <GamingPartners />
  </div>
  <div class={paddingWrapperClasses}>
    <ENSPartners />
  </div>
  <RankUp />
  <ExploreEcosystem />
</div>

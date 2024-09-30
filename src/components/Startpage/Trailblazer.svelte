<script lang="ts">
  import S2StartBanner from '$components/Banner/S2StartBanner.svelte';
  import EcosystemSection from '$components/Ecosystem/EcosystemSection.svelte';
  import { classNames } from '$libs/util/classNames';

  import ExploreEcosystem from './ExploreEcosystem.svelte';
  import Factions from './Factions/Factions.svelte';
  import { TrailblazerGuide } from './Guide';
  import { RankUp } from './RankUp';
  import TrailblazerMain from './TrailblazerMain.svelte';

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

  // const separator80pxClasses = classNames(separatorBaseClasses, 'h-[80px]');

  const separator120pxClasses = classNames(separatorBaseClasses, 'h-[120px]');
</script>

<div class={wrapperClasses}>
  <TrailblazerMain />
  <div class={separator40pxClasses} />

  <TrailblazerGuide />
  <S2StartBanner />

  <div class={separator120pxClasses} />

  <Factions />

  <RankUp />

  <EcosystemSection />

  <ExploreEcosystem />
</div>

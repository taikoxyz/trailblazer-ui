<script lang="ts">
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
  );
  const separatorClasses = classNames('w-full', 'h-[1px]', 'bg-divider-border');
  const paddingWrapperClasses = classNames(
    'w-full',
    'px-[40px]',
    'lg:px-[57px]',

    'md:px-[47px]',
  );

  const separatorBaseClasses = classNames('w-full', 'mt-[-150px]', 'mb-[-150px]');
  const separator40pxClasses = classNames(separatorBaseClasses, 'h-[40px]');

  const separator80pxClasses = classNames(separatorBaseClasses, 'h-[80px]');

  // const separator120pxClasses = classNames(separatorBaseClasses, 'h-[120px]');
</script>

<div class={wrapperClasses}>
  <TrailblazerMain />
  <div class={separator40pxClasses} />
  <TrailblazerGuide />

  <div class={separator80pxClasses} />

  <div class={paddingWrapperClasses}>
    <div class={separatorClasses} />
  </div>

  <div class={separator80pxClasses} />

  <Factions />

  <RankUp />

  <EcosystemSection />

  <ExploreEcosystem />
</div>

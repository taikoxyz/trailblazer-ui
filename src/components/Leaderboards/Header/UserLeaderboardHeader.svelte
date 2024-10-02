<script lang="ts">
  import { classNames } from '$lib/shared/utils/classNames';

  import { LastUpdated } from '../';

  export let lastUpdated: Date;

  const containerClasses = classNames(
    'flex',
    'flex-col',
    'md:flex-row',
    'md:max-h-[100px]',
    'lg:max-h-[120px]',
    'gap-[20px]',
    'text-center',
    'md:text-left',
    'justify-between',
    'w-full',
    'md:mt-[52px]',
    'overflow-hidden',
  );

  const headlineContainerClasses = classNames(
    'font-clash-grotesk',
    'text-[45px]/[45px]',
    'lg:text-[60px]/[60px]',
    'leading-none',
    'text-primary-content',
    'z-10',
    'relative',
  );

  const headlineHighlightClasses = classNames('text-secondary');

  const infoContainerClasses = classNames(
    'flex',
    'flex-col',
    'md:max-w-[286px]',
    'text-center',
    'md:text-right',
    'gap-[40px]',
    'md:gap-[20px]',
    'mt-0',
  );

  const descriptionTextClasses = classNames('text-sm', 'lg:text-base', 'text-secondary-content');
</script>

<div class={containerClasses}>
  <div class={headlineContainerClasses}>
    <span class={headlineHighlightClasses}>User<br /></span> Leaderboard
  </div>

  <div class={infoContainerClasses}>
    <div class={descriptionTextClasses}>Explore our ecosystem and stay tuned for competitions to rank up.</div>
    <LastUpdated {lastUpdated} />
  </div>
</div>

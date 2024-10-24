<script lang="ts">
  import type { InfoBoxType } from '$lib/domains/leaderboard/types/liquidity/types';
  import { classNames } from '$shared/utils/classNames';

  import Infobox from './Infobox.svelte';

  const boxes: InfoBoxType[] = [
    {
      title: 'Earn 10K TAIKO',
      icon: '/icons/coins.svg',
      text: 'The top 100 will each win a guaranteed 10K Taiko tokens, no matter your final ranking!',
    },
    {
      title: 'Boost your points',
      icon: '/icons/rocket.svg',
      text: 'Random snapshot rewards mean every contribution counts! The more liquidity you provide, the higher your points, stacking across all protocols.',
    },
    {
      title: 'Random rewards',
      icon: '/icons/gift.svg',
      text: 'Random snapshots can happen at any time during the campaign, so stay ready to rack up points and maximize your rewards!',
    },
    {
      title: 'All season long',
      icon: '/icons/flame.svg',
      text: 'TThis campaign runs until the end of Season 2, but don’t worry—the fun will continue through Season 3.',
    },
  ];

  const gridClasses = classNames('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-[50px]');

  const titleSectionClasses = classNames(
    'flex',
    'flex-col',
    'gap-10',
    'w-full',
    'md:min-w-[400px]',
    'md:w-[400px]',
    'self-start',
    'justify-center',
    'md:justify-start',
  );

  const titleTextClasses = classNames('text-[20px]', 'text-white', 'font-clash-grotesk');

  const wrapperClasses = classNames();

  const lineClasses = classNames('border border-primary-brand w-16', 'mb-[70px]');
</script>

<div class={wrapperClasses}>
  <div class={titleSectionClasses}>
    <div class="flex flex-col gap-5 items-center md:items-start">
      <div class={titleTextClasses}>🏆&nbsp;&nbsp;What’s in it for you?</div>
      <div class={lineClasses} />
    </div>
  </div>
  <div class={gridClasses}>
    {#each boxes as box}
      <Infobox content={box} />
    {/each}
  </div>
</div>

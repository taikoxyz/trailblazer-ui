<script lang="ts">
  import { t } from 'svelte-i18n';

  import type { InfoBoxType } from '$lib/domains/leaderboard/types/liquidity/types';
  import { classNames } from '$shared/utils/classNames';

  import Infobox from './Infobox.svelte';

  const boxes: InfoBoxType[] = [
    {
      title: $t('leaderboard.liquidityRoyale.infobox.rewards.title'),
      icon: '/icons/coins.svg',
      text: $t('leaderboard.liquidityRoyale.infobox.rewards.text'),
    },
    {
      title: $t('leaderboard.liquidityRoyale.infobox.boost.title'),
      icon: '/icons/rocket.svg',
      text: $t('leaderboard.liquidityRoyale.infobox.boost.text'),
    },
    {
      title: $t('leaderboard.liquidityRoyale.infobox.random.title'),
      icon: '/icons/gift.svg',
      text: $t('leaderboard.liquidityRoyale.infobox.random.text'),
    },
    {
      title: $t('leaderboard.liquidityRoyale.infobox.campaign.title'),
      icon: '/icons/flame.svg',
      text: $t('leaderboard.liquidityRoyale.infobox.campaign.text'),
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
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class={titleTextClasses}>{@html $t('leaderboard.liquidityRoyale.infobox.title')}</div>
      <div class={lineClasses} />
    </div>
  </div>
  <div class={gridClasses}>
    {#each boxes as box}
      <Infobox content={box} />
    {/each}
  </div>
</div>

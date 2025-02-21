<script lang="ts">
  import { t } from 'svelte-i18n';

  import type { InfoBoxType } from '$lib/domains/leaderboard/types/liquidity/types';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  import Infobox from './Infobox.svelte';

  $: boxes = [
    {
      title: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.win.title`),
      icon: '/icons/coins.svg',
      text: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.win.text`),
    },
    {
      title: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.trade.title`),
      icon: '/icons/rocket.svg',
      text: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.trade.text`),
    },
    {
      title: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.ecosystem.title`),
      icon: '/icons/gift.svg',
      text: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.ecosystem.text`),
    },
    {
      title: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.moment.title`),
      icon: '/icons/flame.svg',
      text: $t(`leaderboard.trading_carnival.infobox.s${$activeSeason}.moment.text`),
    },
  ] satisfies InfoBoxType[];

  const gridClasses = classNames('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-[74px]');

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

  $: title = $t(`leaderboard.liquidityRoyale.infobox.s${$activeSeason}.title`);
</script>

<div class={wrapperClasses}>
  <div class={titleSectionClasses}>
    <div class="flex flex-col gap-5 items-center md:items-start">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class={titleTextClasses}>{@html title}</div>
      <div class={lineClasses} />
    </div>
  </div>
  <div class={gridClasses}>
    {#each boxes as box}
      <Infobox content={box} />
    {/each}
  </div>
</div>

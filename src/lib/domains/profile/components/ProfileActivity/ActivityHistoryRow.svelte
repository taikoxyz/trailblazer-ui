<script lang="ts">
  import { t } from 'svelte-i18n';

  import { eventToActivityTypeMap } from '$lib/domains/profile/mappers/eventToActivityMapper';
  import { ActivityType, type UserPointHistory } from '$lib/domains/profile/types/ActivityHistory';
  import { ActivityIcon } from '$shared/components/Icon';
  import Icon from '$shared/components/Icon/Icon.svelte';
  import { Pill } from '$shared/components/Pill';
  import { classNames } from '$shared/utils/classNames';
  import { formatDate } from '$shared/utils/formatDate';
  import { truncateDecimal } from '$shared/utils/truncateDecimal';

  export let historyEntry: UserPointHistory;

  const rowClass = classNames(
    'grid',
    'items-center',
    'gap-x-[26px]',
    'px-[16px]',
    'md:px-[48px]',
    'h-[64px]',
    'body-bold',
    'text-sm',
    'grid-cols-[minmax(125px,1fr)_minmax(10px,1fr)_30px]',
    'lg:grid-cols-[minmax(135px,1fr)_minmax(135px,1fr)_minmax(135px,1fr)]',
  );

  const activityCellClass = classNames('flex', 'gap-2', 'items-center');

  const pointsCellClass = classNames('whitespace-nowrap');

  const iconCellClass = classNames('flex', 'justify-center', 'items-center', 'block', 'lg:hidden', 'w-[30px]');

  const timeCellClass = classNames('whitespace-nowrap', 'hidden', 'lg:block');

  const negativeSentimentClass = classNames('text-negative-sentiment', 'truncate');
  const pointsInnerClass = classNames('flex', 'gap-2', 'items-center');
  const pillClass = classNames('bg-gradient-to-r from-purple-600 via-[#9f00b8] via-[#ca00a8] to-secondary');
  const eventClasses = classNames('w-full', 'text-sm');
</script>

<div class={rowClass}>
  <!-- Activity Cell -->
  <div class={activityCellClass}>
    {#if eventToActivityTypeMap[historyEntry?.event] === ActivityType.TRANSACTION_VALUE}
      <ActivityIcon type="double-coin" />
      <span class={eventClasses}>{$t('leaderboard.user.event.transaction_value')}</span>
    {:else if eventToActivityTypeMap[historyEntry?.event] === ActivityType.BLOCK_PROPOSED}
      <ActivityIcon type="cube" />
      <span class={eventClasses}>{$t('leaderboard.user.event.block_proposed')}</span>
    {:else if eventToActivityTypeMap[historyEntry?.event] === ActivityType.BRIDGED}
      <ActivityIcon type="double-diamond" />
      <span class={eventClasses}>{$t('leaderboard.user.event.bridged')}</span>
    {:else if eventToActivityTypeMap[historyEntry?.event] === ActivityType.PREDICTION}
      <ActivityIcon type="event-prediction" />
      <span class={eventClasses}>{$t('leaderboard.user.event.prediction')}</span>
    {:else}
      <ActivityIcon type="triple-coin-stacked" />
      <span class={eventClasses}>{$t('leaderboard.user.event.transaction')}</span>
    {/if}
  </div>

  <!-- Points Cell -->
  <div class={pointsCellClass}>
    {#if historyEntry?.points === -1}
      <span class={negativeSentimentClass}>{$t('leaderboard.user.dailyMaxReached')}</span>
    {:else}
      <div class={pointsInnerClass}>
        <span class="md:hidden">
          {$t('leaderboard.user.points', {
            values: { value: Math.round(historyEntry?.points) },
          })}
        </span>
        <span class="hidden md:flex">
          {$t('leaderboard.user.points', {
            values: { value: truncateDecimal(historyEntry?.points, 2) },
          })}
        </span>
        {#if historyEntry?.multiplier && historyEntry?.multiplier > 1 && historyEntry.points > 0}
          <Pill class={pillClass}>
            {$t('leaderboard.user.booster', { values: { multiplier: historyEntry?.multiplier } })}
          </Pill>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Icon Cell (Visible on small screens, hidden on lg and up) -->
  <div class={iconCellClass}>
    <!-- Icon is visible on mobile, hidden on lg and up -->
    {#if historyEntry.tx_hash}
      <a
        href={`https://taikoscan.io/tx/${historyEntry?.tx_hash}`}
        target="_blank"
        class="btn block btn-ghost btn-sm btn-circle items-center content-center pt-1 flex lg:hidden">
        <Icon type="arrow-top-right" fillClass="fill-primary-link" />
      </a>
    {/if}
  </div>
  <!-- Time Cell (Hidden on mobile, visible on large screens) -->
  <div class={timeCellClass}>
    {#if historyEntry.tx_hash}
      <a href={`https://taikoscan.io/tx/${historyEntry?.tx_hash}`} target="_blank" class="f-row gap-1">
        {formatDate(historyEntry?.date)}
        <Icon type="arrow-top-right" fillClass="fill-primary-link" />
      </a>
    {:else}
      {formatDate(historyEntry?.date)}
    {/if}
  </div>
</div>

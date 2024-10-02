<script lang="ts">
  import { t } from 'svelte-i18n';

  import { ActivityIcon } from '$components/Icon';
  import Icon from '$components/Icon/Icon.svelte';
  import { Pill } from '$components/Pill';
  import { classNames } from '$lib/shared/utils/classNames';
  import { formatDate } from '$libs/util/formatDate';
  import { truncateDecimal } from '$libs/util/truncateDecimal';

  export let pointHistory;

  // CSS classes
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
  const pillClass = classNames('bg-gradient-to-r from-[#5d08c8] via-[#9f00b8] via-[#ca00a8] to-secondary');
  const eventClasses = classNames('w-full', 'text-sm');
</script>

<div class={rowClass}>
  <!-- Activity Cell -->
  <div class={activityCellClass}>
    {#if pointHistory?.event === 'TransactionValue'}
      <ActivityIcon type="double-coin" />
      <span class={eventClasses}>{$t('leaderboard.user.event.transaction_value')}</span>
    {:else if pointHistory?.event === 'BlockProposed'}
      <ActivityIcon type="cube" />
      <span class={eventClasses}>{$t('leaderboard.user.event.block_proposed')}</span>
    {:else if pointHistory?.event === 'Bridged'}
      <ActivityIcon type="double-diamond" />
      <span class={eventClasses}>{$t('leaderboard.user.event.bridged')}</span>
    {:else}
      <ActivityIcon type="triple-coin-stacked" />
      <span class={eventClasses}>{$t('leaderboard.user.event.transaction')}</span>
    {/if}
  </div>

  <!-- Points Cell -->
  <div class={pointsCellClass}>
    {#if pointHistory?.points === 0}
      <span class={negativeSentimentClass}>{$t('leaderboard.user.dailyMaxReached')}</span>
    {:else}
      <div class={pointsInnerClass}>
        <span>
          {$t('leaderboard.user.points', {
            values: { value: truncateDecimal(pointHistory?.points, 3) },
          })}
        </span>
        {#if pointHistory?.multiplier && pointHistory?.multiplier > 1}
          <Pill class={pillClass}>
            {$t('leaderboard.user.booster', { values: { multiplier: pointHistory?.multiplier } })}
          </Pill>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Icon Cell (Visible on small screens, hidden on lg and up) -->
  <div class={iconCellClass}>
    <!-- Icon is visible on mobile, hidden on lg and up -->
    <button class="btn block btn-ghost btn-sm btn-circle items-center content-center pt-1 flex lg:hidden">
      <Icon type="arrow-top-right" fillClass="fill-primary-link" />
    </button>
  </div>
  <!-- Time Cell (Hidden on mobile, visible on large screens) -->
  <div class={timeCellClass}>{formatDate(pointHistory?.date)}</div>
</div>

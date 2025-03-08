<script lang="ts">
  import { onDestroy, type ComponentType } from 'svelte';
  import { isAddress, zeroAddress } from 'viem';
  import { leaderboardConfig } from '$config';
  import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
  import { DisabledMask } from '$shared/components/Masks';
  import Paginator from '$shared/components/Paginator/Paginator.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  // import { getLogger } from '$shared/utils/logger';
  import LoadingRow from './LoadingRow.svelte';
  import TableHeader from './TableHeader.svelte';
  import TableRow from './TableRow.svelte';

  export let headers: string[];
  export let data: UnifiedLeaderboardRow[];
  export let highlightedUserPosition: UnifiedLeaderboardRow | null = null;
  export let showTrophy = true;
  export let isLoading = false;
  export let handlePageChange: (page: number) => void;
  export let currentPage = 1;
  export let totalItems = 0;
  export let headerComponent: ComponentType;
  export let ended = false;
  export let scoreComponent: ComponentType;
  export let season: number;
  export let additionalInfoComponent: ComponentType | null = null;
  export let endedComponent: ComponentType | null = null;
  export let endTitleText = '';
  export let endDescriptionText = '';
  export let lastUpdated = new Date();
  export let showPagination = true;
  export let showDetailsColumn = true;
  export let qualifyingPositions = 3;
  export let tabs: { slug: string; name: string }[] = [];
  export let activeTabStore: import('svelte/store').Writable<string>;

  // const log = getLogger('AbstractLeaderboard');

  $: pageSize = leaderboardConfig.pageSize;

  let expandedRow = -1;
  function toggleRow(index: number) {
    expandedRow = expandedRow === index ? -1 : index;
  }

  function getFillClass(rank: number | null | undefined): string {
    if (rank === null || rank === undefined) return '';
    if (qualifyingPositions > 5 && rank <= qualifyingPositions) return 'fill-fixed-icon';
    switch (rank) {
      case 1:
        return 'fill-warning-sentiment';
      case 2:
        return 'fill-grey-300';
      case 3:
        return 'fill-yellow-700';
      case 4:
      case 5:
        return 'fill-secondary-brand';
      default:
        return '';
    }
  }

  function getRank(entry: UnifiedLeaderboardRow | undefined, index: number): number {
    if (!entry) return index + 1 + (currentPage - 1) * pageSize;
    return entry.rank ?? index + 1 + (currentPage - 1) * pageSize;
  }

  const containerClass = classNames('overflow-x-auto', 'lg:w-full', 'px-8', 'md:px-0', 'lg:mt-0');
  const headerMarginClass = classNames('mt-[60px]', 'lg:mt-[80px]', 'block', 'lg:hidden');
  const additionalInfoMarginClass = classNames('mt-[60px]', 'lg:mt-[80px]');
  const textCenterClass = classNames('text-center', 'mt-[30px]', 'text-xl');
  const tableWrapperClass = classNames(
    'relative',
    'overflow-x-auto',
    'rounded-3xl',
    'p-6',
    'rounded-[30px]',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
  );
  const tableClass = classNames(
    'relative',
    'table-lg',
    'w-full',
    'body-regular',
    'text-white',
    'rounded-3xl',
    'border-separate',
    'border-spacing-y-4',
    'border-spacing-x-0',
  );
  $: tbodyClass = ended ? 'rounded-lg blur-[1.5px]' : 'rounded-lg';
  const noDataRowClass = classNames('row', 'h-12');
  const paginationMarginClass = classNames('mt-[38px]');
  const tabPanelClasses = classNames('mx-[24px]', 'md:mx-0', 'relative', '');
  const tabClasses = classNames(
    'text-center',
    'rounded-full',
    'lg:rounded-none',
    'lg:rounded-t-[20px]',
    'h-[44px]',
    'btn',
    'md:tab',
    'md:w-[140px]',
    'px-[20px]',
    'btn-ghost',
    'border-primary-brand',
    'hover:cursor-pointer',
    'hover:bg-primary-interactive-hover',
    'hover:text-white',
    'hover:border-primary-brand',
    'whitespace-nowrap',
    'body-bold',
    'lg:bg-transparent',
    'lg:border-none',
  );
  const tablistClasses = classNames(
    'flex',
    'flex-wrap',
    'w-full',
    'justify-center',
    'lg:justify-start',
    'lg:px-[26px]',
    'tabs',
    'gap-[10px]',
    'mb-[30px]',
    'lg:mb-0',
  );

  let activeTab: string;
  $: activeTab = $activeTabStore;

  const unsubscribe = activeTabStore.subscribe((val) => {
    activeTab = val;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class={containerClass}>
  <svelte:component this={headerComponent} {lastUpdated} {season} />
  {#if ended && endedComponent}
    <div class={headerMarginClass}>
      <svelte:component this={endedComponent} title={endTitleText} description={endDescriptionText} />
    </div>
  {/if}
  {#if additionalInfoComponent && !ended}
    <div class={additionalInfoMarginClass}>
      <svelte:component this={additionalInfoComponent} {lastUpdated} {season} />
    </div>
  {/if}
  <div class={textCenterClass}></div>
  <slot />
  {#if tabs.length}
    <div role="tablist" class={tablistClasses}>
      {#each tabs as tab, index}
        <button
          type="button"
          role="tab"
          class={tabClasses}
          aria-selected={tab.slug === activeTab}
          on:click={() => activeTabStore.set(tab.slug)}
          aria-controls={`tabpanel-${index}`}
          id={`tab-${index}`}
          tabindex={tab.slug === activeTab ? 0 : -1}>
          {tab.name}
        </button>
      {/each}
    </div>
    <div
      role="tabpanel"
      class={tabPanelClasses}
      aria-labelledby={`tab-${tabs.findIndex((t) => t.slug === activeTab)}`}
      id={`tabpanel-${activeTab}`}>
    </div>
  {/if}
  <div class={tableWrapperClass}>
    {#if ended && data.length > 0}
      <DisabledMask title={endTitleText} description={endDescriptionText} />
    {/if}
    <table class={tableClass}>
      <TableHeader {headers} />
      <tr class="h-[4px]">
        <td colspan={headers.length}></td>
      </tr>
      <tbody class={tbodyClass}>
        {#if highlightedUserPosition && getConnectedAddress() !== zeroAddress}
          {@const rank = highlightedUserPosition.rank}
          {@const userEntry = { ...highlightedUserPosition, address: 'Your position' }}
          {@const fillClass = getFillClass(rank)}
          <TableRow
            entry={userEntry}
            index={-1}
            {rank}
            {fillClass}
            {showTrophy}
            {expandedRow}
            {toggleRow}
            {scoreComponent}
            {showDetailsColumn}
            {qualifyingPositions} />
        {/if}
        {#if isLoading}
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each Array(pageSize) as _, index}
            <LoadingRow />
          {/each}
        {:else}
          {#each data as entry, index}
            {@const computedRank = getRank(entry, index)}
            {@const fillClass = getFillClass(computedRank) || ''}
            {@const rank = getRank(entry, index)}
            {@const highlightIndexPosition =
              entry.address && isAddress(entry.address) && entry.address === highlightedUserPosition?.address
                ? index
                : null}
            <TableRow
              {entry}
              {index}
              {rank}
              {highlightIndexPosition}
              {fillClass}
              {showTrophy}
              {expandedRow}
              {toggleRow}
              {scoreComponent}
              {showDetailsColumn}
              {qualifyingPositions} />
          {/each}
        {/if}
        {#if data.length === 0 && !isLoading}
          <tr class={noDataRowClass}>
            <td class="lg:px-10" colspan="3">No data available yet</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
  {#if showPagination}
    <div class={paginationMarginClass}>
      <Paginator
        {pageSize}
        {currentPage}
        limitPages
        maxPages={Math.ceil(totalItems / pageSize)}
        bind:totalItems
        on:pageChange={({ detail: selectedPage }) => handlePageChange(selectedPage)} />
    </div>
  {/if}
</div>

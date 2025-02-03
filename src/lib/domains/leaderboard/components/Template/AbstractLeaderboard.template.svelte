<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { isAddress, zeroAddress } from 'viem';

  import { leaderboardConfig } from '$config';
  import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
  import { DisabledMask } from '$shared/components/Masks';
  import Paginator from '$shared/components/Paginator/Paginator.svelte';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import LoadingRow from './LoadingRow.svelte';
  import TableHeader from './TableHeader.svelte';
  import TableRow from './TableRow.svelte';

  // Component Props
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

  // Reactive Variables
  $: pageSize = leaderboardConfig.pageSize;

  // Local State
  let expandedRow = -1;

  // Helper Functions
  function toggleRow(index: number) {
    expandedRow = expandedRow === index ? -1 : index;
  }

  function getFillClass(rank: number | null): string {
    if (!rank) return '';

    if (qualifyingPositions > 5 && rank <= qualifyingPositions) {
      return 'fill-fixed-icon';
    }
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

  function getRank(entry: UnifiedLeaderboardRow, index: number): number {
    return entry.rank ?? index + 1 + (currentPage - 1) * pageSize;
  }

  // CSS Classes
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
</script>

<div class={containerClass}>
  <!-- The leaderboard header -->
  <svelte:component this={headerComponent} {lastUpdated} {season} />

  <!-- Leaderboard or season ended overlay -->
  {#if ended && endedComponent}
    <div class={headerMarginClass}>
      <svelte:component this={endedComponent} title={endTitleText} description={endDescriptionText} />
    </div>
  {/if}

  <!-- Additional component such as prize pool -->
  {#if additionalInfoComponent && !ended}
    <div class={additionalInfoMarginClass}>
      <svelte:component this={additionalInfoComponent} {lastUpdated} {season} />
    </div>
  {/if}

  <div class={textCenterClass}></div>
  <slot />

  <div class={tableWrapperClass}>
    {#if ended && data.length > 0}
      <DisabledMask title={endTitleText} description={endDescriptionText} />
    {/if}
    <table class={tableClass}>
      <TableHeader {headers} />
      <div class="h-[4px]" />

      <tbody class={tbodyClass}>
        <!-- A single row to highlight a position -->
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

        <!-- Loading rows -->
        {#if isLoading}
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each Array(pageSize) as _, index}
            <LoadingRow />
          {/each}
        {:else}
          <!-- The actual data rows -->
          {#each data ?? [] as entry, index}
            {@const rank = getRank(entry, index)}
            {@const highlightIndexPosition =
              entry.address && isAddress(entry.address) && entry.address === highlightedUserPosition?.address
                ? index
                : null}
            {@const fillClass = getFillClass(rank)}

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

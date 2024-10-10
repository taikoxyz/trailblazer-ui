<script lang="ts">
  import type { ComponentType } from 'svelte';

  import { leaderboardConfig } from '$config';
  import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
  import { DisabledMask } from '$shared/components/Masks';
  import Paginator from '$shared/components/Paginator/Paginator.svelte';
  import { classNames } from '$shared/utils/classNames';

  import LoadingRow from './LoadingRow.svelte';
  import TableHeader from './TableHeader.svelte';
  import TableRow from './TableRow.svelte';

  export let headers: string[];
  export let data: UnifiedLeaderboardRow[];
  export let showTrophy: boolean = true;
  export let isLoading: boolean = false;
  export let handlePageChange: (page: number) => void;
  export let currentPage: number = 1;
  export let totalItems: number = 0;
  export let headerComponent: ComponentType;
  export let ended: boolean = false;
  export let scoreComponent: ComponentType;

  export let additionalInfoComponent: ComponentType | null = null;
  // export let showCTA: boolean = true;

  // End info and components
  export let endedComponent: ComponentType | null = null;
  export let endTitleText: string = '';
  export let endDescriptionText: string = '';
  export let lastUpdated: Date = new Date();

  export let showPagination: boolean = true;
  export let showDetailsColumn: boolean = true;

  $: pageSize = leaderboardConfig.pageSize;

  // State for expanded rows
  let expandedRow = -1;

  function toggleRow(index: number) {
    expandedRow = expandedRow === index ? -1 : index;
  }

  // CSS classes extracted to variables
  const containerClass = classNames('overflow-x-auto', 'lg:w-full', 'px-8', 'lg:mt-0');
  const headerMarginClass = classNames('mt-[60px]', 'lg:mt-[80px]', 'block', 'lg:hidden');
  const additionalInfoMarginClass = classNames('mt-[60px]', 'lg:mt-[80px]');
  const textCenterClass = classNames('text-center', 'mt-[30px]', 'text-xl');
  const tableWrapperClass = classNames('overflow-x-auto', 'rounded-3xl');
  const tableClass = classNames('relative', 'table-lg', 'w-full', 'body-regular', 'text-white', 'rounded-3xl');
  const tableStyle = 'background: rgba(25, 30, 40, .50)';
  const tbodyClass = classNames('rounded-lg', ended ? 'blur-[1.5px]' : '');
  const noDataRowClass = classNames('row', 'h-12');
  const paginationMarginClass = classNames('mt-[38px]');
</script>

<div class={containerClass}>
  <svelte:component this={headerComponent} {lastUpdated} />
  {#if ended && endedComponent}
    <div class={headerMarginClass}>
      <svelte:component this={endedComponent} title={endTitleText} description={endDescriptionText} />
    </div>
  {/if}
  {#if additionalInfoComponent && !ended}
    <div class={additionalInfoMarginClass}>
      <svelte:component this={additionalInfoComponent} {lastUpdated} />
    </div>
  {/if}
  <div class={textCenterClass}></div>
  <slot />
  <div class={tableWrapperClass}>
    <table class={tableClass} style={tableStyle}>
      <TableHeader {headers} />
      {#if ended && data.length > 0}
        <DisabledMask title={endTitleText} description={endDescriptionText} />
      {/if}
      <tbody class={tbodyClass}>
        {#if isLoading}
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each Array(pageSize) as _, index}
            {@const rank = index + 1 + (currentPage - 1) * pageSize}
            {@const fillClass =
              rank === 1
                ? 'fill-warning-sentiment'
                : rank === 2
                  ? 'fill-grey-300'
                  : rank === 3
                    ? 'fill-yellow-700'
                    : ''}
            <LoadingRow {rank} {fillClass} {showTrophy} />
          {/each}
        {:else}
          {#each data as entry, index}
            {@const rank = index + 1 + (currentPage - 1) * pageSize}
            {@const fillClass =
              rank === 1
                ? 'fill-warning-sentiment'
                : rank === 2
                  ? 'fill-grey-300'
                  : rank === 3
                    ? 'fill-yellow-700'
                    : ''}
            <TableRow
              {entry}
              {index}
              {rank}
              {fillClass}
              {showTrophy}
              {expandedRow}
              {toggleRow}
              {scoreComponent}
              {showDetailsColumn} />
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
        limitPages={true}
        maxPages={Math.ceil(totalItems / pageSize)}
        bind:totalItems
        on:pageChange={({ detail: selectedPage }) => handlePageChange(selectedPage)} />
    </div>
  {/if}
</div>

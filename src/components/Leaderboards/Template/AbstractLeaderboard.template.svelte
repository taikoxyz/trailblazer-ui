<script lang="ts">
  import type { ComponentType } from 'svelte';

  import { DisabledMask } from '$components/Masks';
  import Paginator from '$components/Paginator/Paginator.svelte';
  import { leaderboardConfig } from '$config';
  import type { UnifiedLeaderboardRow } from '$libs/leaderboard';

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
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[116px] lg:mt-0">
  <svelte:component this={headerComponent} {lastUpdated} />
  {#if ended && endedComponent}
    <div class="mt-[60px] lg:mt-[80px] block lg:hidden">
      <svelte:component this={endedComponent} title={endTitleText} description={endDescriptionText} />
    </div>
  {/if}
  {#if additionalInfoComponent && !ended}
    <div class="mt-[60px] lg:mt-[80px]">
      <svelte:component this={additionalInfoComponent} />
    </div>
  {/if}
  <div class="text-center mt-[30px] text-xl"></div>
  <slot />
  <div class="overflow-x-auto rounded-3xl">
    <table
      class="relative table-lg w-full body-regular text-white rounded-3xl"
      style="background: rgba(25, 30, 40, .50)">
      <TableHeader {headers} />
      {#if ended && data.length > 0}
        <DisabledMask title={endTitleText} description={endDescriptionText} />
      {/if}
      <tbody class="rounded-lg {ended ? 'blur-[1.5px]' : ''}  ">
        {#if isLoading}
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each Array(pageSize) as _, index}
            {@const rank = index + 1 + (currentPage - 1) * pageSize}
            {@const fillClass =
              rank === 1 ? 'fill-warning-sentiment' : rank === 2 ? 'fill-grey-300' : rank === 3 ? 'fill-[#775602]' : ''}
            <LoadingRow {rank} {fillClass} {showTrophy} />
          {/each}
        {:else}
          {#each data as entry, index}
            {@const rank = index + 1 + (currentPage - 1) * pageSize}
            {@const fillClass =
              rank === 1 ? 'fill-warning-sentiment' : rank === 2 ? 'fill-grey-300' : rank === 3 ? 'fill-[#775602]' : ''}
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
          <tr class="row h-12">
            <td class="lg:px-10" colspan="3">No data available</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  {#if showPagination}
    <div class="mt-[38px]">
      <Paginator
        {pageSize}
        bind:currentPage
        limitPages={true}
        maxPages={100}
        bind:totalItems
        on:pageChange={({ detail: selectedPage }) => handlePageChange(selectedPage)} />
    </div>
  {/if}
</div>

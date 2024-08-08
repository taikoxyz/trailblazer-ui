<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { t } from 'svelte-i18n';

  import LastUpdated from '$components/Leaderboards/LastUpdated.svelte';
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
  export let lastUpdated: Date | null = null;
  export let showLastUpdated: boolean = false;
  export let scoreComponent: ComponentType;
  export let additionalInfoComponent: ComponentType | null = null;

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
  <svelte:component this={headerComponent} />

  {#if additionalInfoComponent}
    <div class="mt-[60px] lg:mt-[80px]">
      <svelte:component this={additionalInfoComponent} />
    </div>
  {/if}
  <div class="text-center mt-[30px] text-xl"></div>

  <div
    class="f-col lg:f-row lg:f-between-center items-center content-center mt-[60px] lg:mt-[77px] mb-[30px] space-y-[30px] lg:space-y-0">
    <div class="text-xl font-bold">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html $t('leaderboard.whitelist.cta')}
    </div>
    {#if showLastUpdated && lastUpdated}
      <LastUpdated class="w-fit" {lastUpdated} />
    {/if}
  </div>

  <div class="overflow-x-auto rounded-3xl">
    <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
      <TableHeader {headers} />
      <tbody class="rounded-lg">
        {#if isLoading}
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each Array(pageSize) as _, index}
            {@const rank = index + 1 + (currentPage - 1) * pageSize}
            {@const fillClass =
              rank === 1 ? 'fill-[#EBB222]' : rank === 2 ? 'fill-[#91969F]' : rank === 3 ? 'fill-[#775602]' : ''}
            <LoadingRow {rank} {fillClass} {showTrophy} />
          {/each}
        {:else}
          {#each data as entry, index}
            {@const rank = index + 1 + (currentPage - 1) * pageSize}
            {@const fillClass =
              rank === 1 ? 'fill-[#EBB222]' : rank === 2 ? 'fill-[#91969F]' : rank === 3 ? 'fill-[#775602]' : ''}
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

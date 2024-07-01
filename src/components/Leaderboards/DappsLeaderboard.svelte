<script lang="ts">
  import ExplorerLink from '$components/Links/ExplorerLink.svelte';
  import { Skeleton } from '$components/Mock';
  import Paginator from '$components/Paginator/Paginator.svelte';
  import mapping from '$libs/leaderboard/json/mapping.json';
  import filterList from '$libs/leaderboard/json/filter.json';
  import { Leaderboard, type LeaderboardRow, type PaginationInfo } from '$libs/leaderboard';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { getLogger } from '$libs/util/logger';
  import { currentLeaderboard } from '$stores/leaderboard';

  import DappsHeader from './Header/DappsHeader.svelte';

  const log = getLogger('BridgeLeaderboard');

  export let pageInfo: PaginationInfo;

  $: pageSize = pageInfo?.size || 10;
  $: totalItems = pageInfo?.total || 0;
  // $: currentPage = pageInfo?.page || 1;

  let headers = ['Dapp', 'Address', 'Points'];

  interface MappingValue {
    name: string;
    handle: string;
    icon?: string;
  }

  interface Mapping {
    [key: string]: MappingValue;
  }

  const detailMapping: Mapping = mapping;

  function handlePageChange(selectedPage: number) {
    log('handlePageChange', selectedPage);
    loadLeaderboardData(selectedPage);
  }

  async function loadLeaderboardData(page: number) {
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo = {
      page,
      size: pageSize,
    };
    const pageInfo = await Leaderboard.getDappLeaderboard(args);
    totalItems = pageInfo.total || $currentLeaderboard.items.length;
    // currentPage = pageInfo.page;
  }

  $: itemsToDisplay = $currentLeaderboard.items.filter((entry: LeaderboardRow) => {
    return !(entry.address in filterList);
  });
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[18%] lg:mt-0 space-y-[60px]">
  <DappsHeader />

  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each itemsToDisplay as entry, index}
        {@const hasName = detailMapping[entry.address] && detailMapping[entry.address].name}
        {@const hasHandle = detailMapping[entry.address] && detailMapping[entry.address].handle}
        {@const hasIcon = detailMapping[entry.address] && detailMapping[entry.address].icon}

        <tr id={index.toString()} class="row h-12">
          <td class="lg:px-10">
            <div class="flex gap-[20px] align-center">
              {#if hasIcon}
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img alt="icon" src="/{detailMapping[entry.address].icon}" />
                  </div>
                </div>
              {:else}
                <Skeleton
                  class="hidden lg:table-cell"
                  width="w-12"
                  height="h-12"
                  bgColor="bg-pink-200"
                  shineColor="bg-pink-100" />
              {/if}
              <div class="flex flex-col justify-around">
                {#if hasName}
                  <div class="body-bold">{detailMapping[entry.address].name}</div>
                {:else}
                  <div class="body-bold">tbd</div>
                {/if}
                {#if hasHandle}
                  <div class="body-small-regular">{detailMapping[entry.address].handle}</div>
                {/if}
              </div>
            </div>
          </td>
          <td class="lg:table-cell hidden lg:px-10 body-regular"><ExplorerLink address={entry.address} /></td>
          <td class="text-start lg:hidden table-cell lg:px-10 body-regular"
            ><ExplorerLink address={entry.address} shorten={true} /></td>
          <td class="lg:px-10 body-regular">{formatNumbers(Math.round(entry.score))}</td>
        </tr>
      {/each}
      {#if itemsToDisplay.length === 0}
        <tr class="row h-12">
          <td class="lg:px-10" colspan="3">No data available</td>
        </tr>
      {/if}
    </tbody>
  </table>

  <Paginator
    {pageSize}
    limitPages={true}
    maxPages={100}
    bind:totalItems
    on:pageChange={({ detail: selectedPage }) => handlePageChange(selectedPage)} />
</div>

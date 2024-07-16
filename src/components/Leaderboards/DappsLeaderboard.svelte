<script lang="ts">
  import { isAddress } from 'ethereum-address';
  import { t } from 'svelte-i18n';

  import { Icon } from '$components/Icon';
  import ExplorerLink from '$components/Links/ExplorerLink.svelte';
  import Paginator from '$components/Paginator/Paginator.svelte';
  import Spinner from '$components/Spinner/Spinner.svelte';
  import { Leaderboard, type LeaderboardRow, type PaginationInfo } from '$libs/leaderboard';
  import filterList from '$libs/leaderboard/json/filter.json';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { getLogger } from '$libs/util/logger';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { currentDappLeaderboard } from '$stores/leaderboard';

  import DappsHeader from './Header/DappsHeader.svelte';

  const log = getLogger('BridgeLeaderboard');

  export let pageInfo: PaginationInfo;
  export let loading: boolean;

  let currentPage = 1;

  $: pageSize = pageInfo?.size || 10;
  $: totalItems = pageInfo?.total || 0;

  let headers = ['No.', 'Dapp', 'Addresses', 'Points'];

  function handlePageChange(selectedPage: number) {
    log('handlePageChange', selectedPage);
    loadLeaderboardData(selectedPage);
  }

  async function loadLeaderboardData(page: number) {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo = {
      page,
      size: pageSize,
    };
    const pageInfo = await Leaderboard.getDappLeaderboard(args);
    totalItems = pageInfo.total || $currentDappLeaderboard.items.length;
    loading = false;
  }

  $: itemsToDisplay = $currentDappLeaderboard.items.filter((entry: LeaderboardRow) => {
    return !(entry.address in filterList);
  });

  // State for expanded rows
  let expandedRow = -1;

  function toggleRow(index: number) {
    expandedRow = expandedRow === index ? -1 : index;
  }
</script>

<div class="overflow-x-auto lg:w-full px-5 lg:px-8 mt-[18%] lg:mt-0 space-y-[60px]">
  <DappsHeader />
  <div class="overflow-x-auto rounded-3xl">
    <table class="table-lg w-full body-regular text-white" style="background: rgba(25, 30, 40, .50)">
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
          {@const rank = index + 1}
          {@const fillClass =
            rank === 1 ? 'fill-[#EBB222]' : rank === 2 ? 'fill-[#91969F]' : rank === 3 ? 'fill-[#775602]' : ''}
          {@const nameIsAddress = isAddress(entry.address)}
          {@const hasDetails = entry.data.length > 0}
          {@const hasIcon = entry.icon}
          {@const hasHandle = entry.handle}
          {#if loading}
            <tr class="row h-12">
              <td class="h-full table-cell body-bold w-1/12">
                <div class="f-center gap-[12px]">
                  {#if currentPage === 1}
                    <Icon type="trophy" {fillClass} />
                    {rank}
                  {:else}
                    {rank + pageSize * (currentPage - 1)}
                  {/if}
                </div>
              </td>
              <td class="lg:px-10">
                <Spinner class="!size-4" />
              </td>
            </tr>
          {:else}
            <tr
              id={index.toString()}
              class="row h-12 hover:bg-neutral-background {hasDetails ? 'cursor-pointer' : ''}"
              on:click={() => toggleRow(index)}>
              <td class="h-full table-cell body-bold w-1/12">
                <div class="f-center gap-[12px]">
                  {#if currentPage === 1}
                    <Icon type="trophy" {fillClass} />
                    {rank}
                  {:else}
                    {rank + pageSize * (currentPage - 1)}
                  {/if}
                </div>
              </td>
              <td class="lg:px-10 w-6/12">
                <div class="flex gap-[20px] align-center">
                  <div class="flex flex-col justify-around">
                    <div class="flex gap-[20px] align-center">
                      {#if hasIcon}
                        <div class="avatar">
                          <div class="w-12 rounded-full">
                            <img alt="icon" src={entry.icon} />
                          </div>
                        </div>
                      {:else}
                        <div class="hidden lg:table-cell w-12 h-12 bg-pink-200 rounded-full" />
                      {/if}
                      <div class="f-col justify-center">
                        {#if nameIsAddress}
                          <div class="body-bold">{shortenAddress(entry.address, 8, 4)}</div>
                        {:else}
                          <div class="body-bold">{entry.address}</div>
                        {/if}
                        {#if hasHandle}
                          <div class="body-small-regular">
                            <a
                              href={'https://twitter.com/' + entry?.handle}
                              class="f-row text-primary-link underline text-[14px]/[20px] gap-1"
                              target="_blank">
                              {entry?.handle}
                              <Icon size={10} type="arrow-top-right" />
                            </a>
                          </div>
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              {#if hasDetails}
                <td class="text-start table-cell lg:px-10 body-regular w-3/12">
                  <button class="link">Details</button>
                </td>
              {:else}
                <td class="text-start table-cell lg:px-10 body-regular w-3/12">
                  <ExplorerLink address={entry.address} linkText={$t('common.explorer')} shorten />
                </td>
              {/if}
              <td class="lg:px-10 body-regular w-3/12">{formatNumbers(Math.round(entry.totalScore))}</td>
            </tr>
            {#if expandedRow === index && hasDetails}
              {#each entry.data as detail}
                <tr
                  id={(index + 0.5).toString()}
                  class="row border-y-2 border-neutral-background h-12 hover:bg-neutral-background">
                  <td class=""></td>
                  <td class="lg:px-10 w-1/4"><ExplorerLink address={detail.address} /></td>
                  <td class="text-start table-cell lg:px-10 w-1/4"> </td>
                  <td class="lg:px-10 body-regular w-1/4">{formatNumbers(Math.round(detail.score))}</td>
                </tr>
              {/each}
            {/if}
          {/if}
        {/each}
        {#if itemsToDisplay.length === 0 && !loading}
          <tr class="row h-12">
            <td class="lg:px-10" colspan="3">No data available</td>
          </tr>
        {:else if loading}
          <tr class="row h-12">
            <td class="lg:px-10" colspan="3"><Spinner class="!size-4" /> Loading...</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <Paginator
    {pageSize}
    bind:currentPage
    limitPages={true}
    maxPages={100}
    bind:totalItems
    on:pageChange={({ detail: selectedPage }) => handlePageChange(selectedPage)} />
</div>

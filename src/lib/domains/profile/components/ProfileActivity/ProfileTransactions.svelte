<script lang="ts">
  import type { Address } from 'viem';

  import { page } from '$app/stores';
  import { leaderboardConfig } from '$config';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '$lib/domains/profile/stores/profileStore';
  import type { UserPointHistory } from '$lib/domains/profile/types/ActivityHistory';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { Paginator } from '$shared/components/Paginator';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  import LoadingBlobby from '../LoadingBlobby.svelte';
  import ActivityHistoryRow from './ActivityHistoryRow.svelte';

  $: pointsHistory = $userProfile?.activityHistory?.items;
  $: hasPointHistory = pointsHistory && pointsHistory.length > 0;

  let headers = ['Activity', 'Points', ''];

  const pageSize = leaderboardConfig.pageSize;
  $: currentPage = 1;
  $: totalItems = pointsHistory?.length || 0;
  $: totalPages = $userProfile?.activityHistory?.pagination?.total_pages || Math.ceil(totalItems / pageSize);

  async function handlePageChange(selectedPageNo: number) {
    loadLeaderboardData(selectedPageNo);
  }

  async function loadLeaderboardData(selectedPageNo: number) {
    const args: PaginationInfo<UserPointHistory> = {
      page: selectedPageNo,
      size: pageSize,
      total: totalItems,
      total_pages: totalPages,
    };
    const userAddress = $page.url.pathname.split('/').pop() as Address;

    if (!userAddress) {
      return;
    }
    await profileService.updateProfilePointHistoryPage(args, userAddress, $activeSeason);
  }

  // CSS classes
  const containerClass = classNames(
    'container',
    'w-full',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'rounded-[30px]',
    'relative',
  );

  const headerRowClass = classNames(
    'grid',
    'items-center',
    'gap-x-[26px]',
    'px-[16px] ',
    'mx-[16px]',
    'md:mx-[6px]',
    'md:px-[47px]',
    'h-[74px]',
    'body-bold',
    'text-sm',
    'text-secondary-content',
    'grid-cols-[minmax(135px,1fr)_minmax(10px,1fr)_30px]',
    'lg:grid-cols-[minmax(135px,1fr)_minmax(135px,1fr)_minmax(135px,1fr)]',
  );

  const headerCellClass = classNames('font-normal', 'text-left');

  const iconHeaderCellClass = classNames('text-center', 'block', 'lg:hidden', 'w-[30px]');

  const timeHeaderCellClass = classNames('font-normal', 'text-left', 'hidden', 'lg:block');

  const dividerClass = classNames('divider', '!my-0', 'mx-[16px]', 'md:mx-[24px]', 'h-1');

  const paginatorClasses = classNames('!justify-center');
  const paginatorWrapper = classNames('w-full', 'mt-[20px]', 'flex', 'justify-center', 'lg:justify-end', 'max-w-full');
</script>

<div>
  <div class={containerClass}>
    <!-- Header Row -->
    <div class={headerRowClass}>
      <!-- Activity Header -->
      <div class={headerCellClass}>{headers[0]}</div>
      <!-- Points Header -->
      <div class={headerCellClass}>{headers[1]}</div>
      <!-- Icon Header (Visible on mobile, hidden on large screens) -->
      <div class={iconHeaderCellClass}></div>
      <!-- Time Header (Hidden on mobile, visible on large screens) -->
      <div class={timeHeaderCellClass}>{'Time'}</div>
    </div>

    <!-- Divider -->
    <div class={dividerClass}></div>

    {#if $profileLoading}
      <LoadingBlobby />
    {:else}
      <!-- Activity History Rows -->
      {#if pointsHistory && hasPointHistory}
        {#each pointsHistory as historyEntry}
          <ActivityHistoryRow {historyEntry} />
        {/each}
      {:else}
        <div class="p-5 text-center">No activity history available.</div>
      {/if}
    {/if}
  </div>
</div>
<!-- Paginator -->
<div class={paginatorWrapper}>
  <Paginator
    {pageSize}
    bind:currentPage
    class={paginatorClasses}
    limitPages={true}
    maxPages={totalPages}
    bind:totalItems
    on:pageChange={({ detail: selectedPage }) => handlePageChange(selectedPage)} />
</div>

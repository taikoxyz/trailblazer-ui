<script lang="ts">
  import { Paginator } from '$components/Paginator';
  import { Spinner } from '$components/Spinner';
  import { leaderboardConfig } from '$config';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { classNames } from '$libs/util/classNames';
  import getConnectedAddress from '$libs/util/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '../../stores/profileStore';
  import type { UserPointHistory } from '../../types/types';
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
    };
    const userAddress = $userProfile.address;
    if (!userAddress) {
      return;
    }
    await profileService.updateProfilePointHistoryPage(args, getConnectedAddress(), 2);
  }

  // CSS classes
  const containerClass = classNames(
    'container',
    'w-full',
    'bg-elevated-background',
    'xl:max-w-[1344px]',
    'sm:rounded-b-[30px]',
    'rounded-t-[30px]',
    'md:rounded-tl-none',
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

  const loadingOverlayClass = classNames(
    'w-full',
    'h-full',
    'flex',
    'mt-4',
    'justify-center',
    'items-center',
    'h-[70px]',
  );

  const paginatorClasses = classNames('!justify-center');
  const paginatorWrapper = classNames('w-full', 'mt-[20px]', 'flex', 'justify-center', 'lg:justify-end', 'max-w-full');
</script>

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
    <div class={loadingOverlayClass}>
      <Spinner size="md" />
    </div>
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

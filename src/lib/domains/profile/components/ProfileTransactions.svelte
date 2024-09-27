<script lang="ts">
  import { Paginator } from '$components/Paginator';
  import { Spinner } from '$components/Spinner';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import { classNames } from '$libs/util/classNames';

  import profileService from '../services/ProfileServiceInstance';
  import { userProfile } from '../stores/profileStore';
  import ActivityHistoryRow from './ActivityHistoryRow.svelte';

  $: pointsHistory = $userProfile?.activityHistory?.pointsHistory;
  $: hasPointHistory = pointsHistory && pointsHistory.items && pointsHistory.items.length > 0;

  let headers = ['Activity', 'Points', ''];

  const pageSize = 10;
  $: currentPage = 1;
  $: totalItems = pointsHistory?.total || 0;
  $: totalPages = pointsHistory?.total_pages || Math.ceil(totalItems / pageSize);
  $: isLoading = false;

  async function handlePageChange(selectedPage: number) {
    isLoading = true;
    if ($userProfile.address) {
      pointsHistory = await profileService.getPointHistoryPage(
        $userProfile.address,
        parseInt(activeSeason),
        selectedPage,
      );
    }
    isLoading = false;
  }

  // CSS classes
  const containerClass = classNames(
    'container',
    'w-full',
    'bg-elevated-background',
    'xl:max-w-[1344px]',
    'rounded-[30px]',
    'relative',
  );

  const headerRowClass = classNames(
    'grid',
    'items-center',
    'gap-x-[26px]',
    'p-5',
    'md:px-[54px]',
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

  const dividerClass = classNames('divider', '!my-0', 'mx-[24px]', 'h-1');

  const loadingOverlayClass = classNames(
    'w-full',
    'h-full',
    'bg-black',
    'bg-opacity-60',
    'absolute',
    'top-0',
    'left-0',
    'flex',
    'items-center',
    'justify-center',
    'rounded-[30px]', // Match the container's rounded corners
  );

  const paginatorClasses = classNames('!justify-center');
  const paginatorWrapper = classNames('mt-[20px]', 'flex', 'justify-center', 'max-w-[342px]');
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

  <!-- Activity History Rows -->
  {#if pointsHistory && hasPointHistory}
    {#each pointsHistory.items as pointHistory}
      <ActivityHistoryRow {pointHistory} />
    {/each}
  {:else}
    <div class="p-5 text-center">No activity history available.</div>
  {/if}

  <!-- Loading Overlay -->
  {#if isLoading}
    <div class={loadingOverlayClass}>
      <Spinner size="lg" />
    </div>
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

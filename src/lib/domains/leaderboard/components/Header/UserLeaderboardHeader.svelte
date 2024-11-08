<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { LastUpdated } from '$lib/domains/leaderboard/components/';
  import Search from '$lib/domains/leaderboard/components/Search.svelte';
  import type { LoadLeaderboardDataType } from '$lib/domains/leaderboard/types/shared/types';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { classNames } from '$shared/utils/classNames';

  export let lastUpdated: Date;

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadUserLeaderboardData');
  const pageInfo = getContext<PaginationInfo<UserLeaderboardItem>>('userPageInfo');

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  const wrapperClasses = classNames('space-y-[40px]');

  const bannerBackgroundClasses = classNames(
    'relative',
    'rounded-[30px]',
    'w-full',
    'py-12',

    'bg-cover',
    'md:bg-right',
    'md:bg-contain',
    'bg-no-repeat',
  );

  const headlineClasses = classNames(
    'font-clash-grotesk',
    'text-[45px]/[45px]',
    'lg:text-[60px]/[60px]',
    'leading-none',
    'text-primary-content',
  );

  const headlineSpanClasses = classNames('text-secondary');

  const secondaryContentClasses = classNames(
    'flex',
    'flex-col',
    'lg:flex-row',
    'lg:justify-between',
    'items-center',
    'content-center',
    'text-center',
    'mb-[40px]',
    'lg:space-y-0',
  );

  const ctaWrapperClasses = classNames('flex', 'flex-col', 'order-2');

  const ctaTextClasses = classNames('text-secondary-content');

  const lastUpdatedClasses = classNames('mt-[30px]', 'mb-[40px]', 'md:my-[20px]', 'lg:my-[10px]', 'lg:order-1');

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last', 'z-0', 'pl-2');
</script>

<div class={wrapperClasses}>
  <div class={bannerBackgroundClasses}>
    <div class={headlineClasses}>
      <span class={headlineSpanClasses}>Users<br /></span> Leaderboard
    </div>
  </div>

  <div class={secondaryContentClasses}>
    <div class={ctaWrapperClasses}>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class={ctaTextClasses}>{@html $t('leaderboard.user.cta')}</div>
      <LastUpdated class={lastUpdatedClasses} {lastUpdated} />
    </div>
    <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Address..." />
  </div>
</div>

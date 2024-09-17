<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import type { DappLeaderboardItem, PaginationInfo } from '$libs/leaderboard';
  import { classNames } from '$libs/util/classNames';

  import LastUpdated from '../LastUpdated.svelte';
  import Search from './Search.svelte';

  export let lastUpdated: Date;

  type LoadLeaderboardDataType = (page: number, name?: string) => Promise<void>;

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadDappsLeaderboardData');
  const pageInfo = getContext<PaginationInfo<DappLeaderboardItem>>('dappsPageInfo');

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  const wrapperClasses = classNames('space-y-[40px]');

  const bannerBackgroundClasses = classNames(
    'relative',
    'bg-[#1B0E3E]',
    'rounded-[30px]',
    'w-full',
    'p-12',
    "bg-[url('/leaderboard/banner/dapps/sm/dapps-leaderboard-banner.svg')]",
    "md:bg-[url('/leaderboard/banner/dapps/md/dapps-leaderboard-banner.svg')]",
    'lg:bg-[url("/leaderboard/banner/dapps/lg/dapps-leaderboard-banner.svg")]',
    'xl:bg-[url("/leaderboard/banner/dapps/xl/dapps-leaderboard-banner.svg")]',
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

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last');
</script>

<div class={wrapperClasses}>
  <div class={bannerBackgroundClasses}>
    <div class={headlineClasses}>
      <span class={headlineSpanClasses}>Dapps<br /></span> Leaderboard
    </div>
  </div>

  <div class={secondaryContentClasses}>
    <div class={ctaWrapperClasses}>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class={ctaTextClasses}>{@html $t('leaderboard.whitelist.cta')}</div>
      <LastUpdated class={lastUpdatedClasses} {lastUpdated} />
    </div>
    <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Dapps..." />
  </div>
</div>

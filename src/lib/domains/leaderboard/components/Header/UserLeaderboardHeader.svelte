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

  const containerClasses = classNames(
    'flex',
    'flex-col',
    'md:flex-row',
    'md:max-h-[100px]',
    'lg:max-h-[120px]',
    'gap-[20px]',
    'text-center',
    'md:text-left',
    'justify-between',
    'w-full',
    'py-12',

    'bg-cover',
    'md:bg-right',
    'md:bg-contain',
    'bg-no-repeat',
  );

  const headlineClasses = classNames(
  const headlineClasses = classNames(
    'font-clash-grotesk',
    'text-[45px]/[45px]',
    'lg:text-[60px]/[60px]',
    'text-center',
    'md:text-left',
    'leading-none',
    'text-primary-content',
  );

  const headlineSpanClasses = classNames('text-secondary');
  const headlineSpanClasses = classNames('text-secondary');

  const infoContainerClasses = classNames(
    'flex',
    'flex-col',
    'md:max-w-[286px]',
    'text-center',
    'md:text-right',
    'gap-[40px]',
    'md:gap-[20px]',
    'mt-0',
  );

  const descriptionTextClasses = classNames('text-sm', 'lg:text-base', 'text-secondary-content');
</script>

<div class={containerClasses}>
  <div class={headlineContainerClasses}>
    <span class={headlineHighlightClasses}>User<br /></span> Leaderboard
  </div>

  <div class={infoContainerClasses}>
    <div class={descriptionTextClasses}>Explore our ecosystem and stay tuned for competitions to rank up.</div>
    <LastUpdated {lastUpdated} />
  </div>
</div>

<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import { derived, type Unsubscriber } from 'svelte/store';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { activeLiquidityType, leaderboardStore } from '$lib/domains/leaderboard/stores/liquidityCompetitionStore';
  import type { LoadLeaderboardDataType } from '$lib/domains/leaderboard/types/shared/types';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import { PlusIcon } from '$shared/components/Icon';
  import LiquidityRoyalCarousel from '$shared/components/PartnerCarousel/LiquidityRoyalCarousel.svelte';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { classNames } from '$shared/utils/classNames';
  import { isDesktop, isTablet, isTabletLg } from '$shared/utils/responsiveCheck';

  import LastUpdated from '../../../LastUpdated.svelte';
  import Search from '../../../Search.svelte';
  import Infoboxes from './Infoboxes.svelte';
  import PrizePool from './PrizePool.svelte';
  import ReadMoreBox from './ReadMoreBox.svelte';

  export let lastUpdated: Date;

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadLiquidityCompetitionLeaderboardData');
  const edition = getContext<number>('liquidityEdition');

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  const pageInfoStore = derived(leaderboardStore, ($leaderboardStore) => $leaderboardStore.pagination);
  const unsubscribePageInfo = pageInfoStore.subscribe((value) => {
    pageInfo = value;
  });

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  const containerClasses = classNames('f-col', 'justify-center', 'items-center', 'w-full');
  const wrapperClasses = classNames('f-col', 'w-full', 'z-10', 'overflow-hidden', 'space-y-[120px]');
  const innerWrapperClasses = classNames('f-col', 'md:f-row', 'justify-between', 'items-center', 'space-y-[50px]');

  $: smallHeaderImage = `/competitionInfo/liquidityRoyale/edition${edition}/sm/header.png`;
  $: mediumHeaderImage = `/competitionInfo/liquidityRoyale/edition${edition}/md/header.png`;
  $: largeHeaderImage = `/competitionInfo/liquidityRoyale/edition${edition}/lg/header.png`;
  $: xlargeHeaderImage = `/competitionInfo/liquidityRoyale/edition${edition}/xl/header.png`;

  $: imageUrl = $isDesktop
    ? xlargeHeaderImage
    : $isTabletLg
      ? largeHeaderImage
      : $isTablet
        ? mediumHeaderImage
        : smallHeaderImage;

  //Preload images
  const images = [smallHeaderImage, mediumHeaderImage, largeHeaderImage, xlargeHeaderImage];
  images.forEach((src) => {
    if (browser) {
      const img = new window.Image();
      img.src = src;
    }
  });

  let headerImageClasses = classNames(
    'min-h-[475px]',
    'xl:h-[606px]',
    'xl:max-w-[1520px]',

    'bg-no-repeat',
    'bg-center',
    'bg-contain',
    'overflow-visible',
    'top-[180px]',
    'w-full',
    'z-0',
  );

  const descriptionClasses = classNames(
    'f-col',
    'md:f-row',
    'gap-[24px]',
    'items-center',
    'text-center',
    'md:text-left',
    'md:w-[395px]',
    'lg:w-[600px]',
    'font-clash-grotesk',
    'text-[16px]',
    'font-medium',
    'leading-[22px]',
    'tracking-[0.32px]',
  );
  const plusIconClasses = classNames('self-center', 'mb-6', 'md:mb-0');

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last', 'z-0', 'ml-1', 'order-first');

  const additionalInfoWrapperClasses = classNames(
    'flex',
    'f-between-center',
    'f-col',
    'lg:f-row',
    'space-y-[24px]',
    'lg:space-y-0',
  );

  const getHeaderImageClasses = () => {
    return headerImageClasses;
  };
  $: edition && getHeaderImageClasses();
  $: description = $t(`leaderboard.liquidityRoyale.description.edition${edition}`);

  onDestroy(() => {
    if (activeTypeUnsubscribe) activeTypeUnsubscribe();
    unsubscribePageInfo();
  });

  let activeTypeUnsubscribe: Unsubscriber;
  onMount(() => {
    activeTypeUnsubscribe = activeLiquidityType.subscribe(() => {
      if (pageInfo) loadLeaderboardData(pageInfo.page);
    });
  });
</script>

<div class={containerClasses}>
  <div style={`background-image: url(${imageUrl})`} class={headerImageClasses}></div>

  <div class={wrapperClasses}>
    <div class={innerWrapperClasses}>
      <span class={descriptionClasses}>
        <PlusIcon class={plusIconClasses} />
        {description}
      </span>
      <PrizePool />
    </div>
    <Infoboxes />
    <ReadMoreBox />
    <LiquidityRoyalCarousel />
  </div>
</div>
<div class={additionalInfoWrapperClasses}>
  <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Address..." />
  <LastUpdated {lastUpdated} class="order-last" />
</div>

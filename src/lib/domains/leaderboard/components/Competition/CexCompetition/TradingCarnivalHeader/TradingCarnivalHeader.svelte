<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import type { LoadLeaderboardDataType } from '$lib/domains/leaderboard/types/shared/types';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import { Icon, PlusIcon } from '$shared/components/Icon';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import { isDesktop, isTablet, isTabletLg } from '$shared/utils/responsiveCheck';

  import LastUpdated from '../../../LastUpdated.svelte';
  import Search from '../../../Search.svelte';
  import Infoboxes from './Infoboxes.svelte';
  import PrizePool from './PrizePool.svelte';
  import ReadMoreBox from './ReadMoreBox.svelte';

  export let lastUpdated: Date;

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadLiquidityCompetitionLeaderboardData');
  const pageInfo = getContext<PaginationInfo<UserLeaderboardItem>>('loadLiquidityCompetitionPageInfo');

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  const containerClasses = classNames('f-col', 'justify-center', 'items-center', 'w-full', 'relative');
  const wrapperClasses = classNames('f-col', 'w-full', 'z-10', 'overflow-hidden', 'space-y-[120px]');
  const innerWrapperClasses = classNames('f-col', 'md:f-row', 'justify-between', 'items-center', 'space-y-[50px]');

  $: smallHeaderImage = `/competitionInfo/tradingCarnival/s${$activeSeason}/sm/fallback.png`;
  $: mediumHeaderImage = `/competitionInfo/tradingCarnival/s${$activeSeason}/md/fallback.png`;
  $: largeHeaderImage = `/competitionInfo/tradingCarnival/s${$activeSeason}/lg/fallback.png`;
  $: xlargeHeaderImage = `/competitionInfo/tradingCarnival/s${$activeSeason}/xl/fallback.png`;

  $: imageUrl = $isDesktop
    ? xlargeHeaderImage
    : $isTabletLg
      ? largeHeaderImage
      : $isTablet
        ? mediumHeaderImage
        : smallHeaderImage;

  $: videoUrl =
    $isDesktop || $isTabletLg
      ? `/competitionInfo/tradingCarnival/s${$activeSeason}/xl/trading_carnival.mp4`
      : $isTablet
        ? `/competitionInfo/tradingCarnival/s${$activeSeason}/md/trading_carnival.mp4`
        : `/competitionInfo/tradingCarnival/s${$activeSeason}/sm/trading_carnival.mp4`;

  //Preload images
  const images = [smallHeaderImage, mediumHeaderImage, largeHeaderImage, xlargeHeaderImage];
  images.forEach((src) => {
    if (browser) {
      const img = new window.Image();
      img.src = src;
    }
  });

  const headerImageClasses = classNames(
    'min-h-[475px]',
    'xl:h-[606px]',
    'xl:max-w-[1520px]',
    'w-full',
    'bg-no-repeat',
    'bg-center',
    'bg-contain',
    'overflow-visible',
    'top-[180px]',
    'w-full',
    'z-0',
  );

  const descriptionClasses = classNames(
    'mt-[120px]',
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
    'mt-[100px]',
  );

  const backgroundImageClasses = classNames(
    'absolute',
    'f-col',
    'f-center',
    'md:f-left',
    'flex-col',
    'w-dvw',
    'rounded-[30px]',
    'overflow-hidden',
    'bg-center',
    'w-full',
    'h-full',
    'bg-cover',
    'px-[20px]',
    'bottom-[35px]',
  );

  const liveNowClasses = classNames(
    'f-row',
    'items-center',
    'gap-[17px]',
    'mt-[70px]',
    'md:mt-0',
    'font-clash-grotesk',
    'text-[24px]',
    'md:text-[18px]',
    'uppercase',
    'font-semibold',
    'leading-normal',
    'tracking-[2.4px]',
  );

  const contentWrapperClasses = classNames(
    'f-col',
    'w-full',
    'h-full',
    'justify-end',
    'items-end',
    'px-[20px]',
    'relative',
  );

  const innerContentClasses = classNames(
    'f-row',
    'md:f-col',
    'w-full',
    'z-10',
    'absolute',
    'left-0',
    'bottom-[10px]',
    'rounded-[30px]',
    'md:rounded-full',
    'pt-[30px]',
    'px-[20px]',
    'md:p-[8px]',
    'md:pl-[30px]',
    'md:gap-[20px]',
    'pr-[45px]',
    'items-center',
  );
  const descriptionWrapperClasses = classNames('f-col', 'w-full', 'md:f-row', 'f-left', 'justify-between');
  const descriptionTextClasses = classNames(
    'text-center',
    'md:text-left',
    'f-col',
    'w-full',
    'font-clash-grotesk',
    'text-elevated-background',
    'text-[18px]',
    'font-semibold',
    'leading-normal',
    'uppercase',
  );

  const videoWrapperClasses = classNames(
    'w-full',
    'flex',
    'h-[800px]',
    'xl:max-w-[1344px]',
    'relative',
    'rounded-[30px]',
    'overflow-hidden',
  );
  const getHeaderImageClasses = () => {
    return headerImageClasses;
  };
  $: $activeSeason && getHeaderImageClasses();
  $: description = $t(`leaderboard.trading_carnival.description.s${$activeSeason}`);
</script>

<div class={containerClasses}>
  <div class={videoWrapperClasses}>
    <div class="absolute w-full h-[342px] custom-gradient bottom-0"></div>

    <video autoplay loop muted playsinline poster={imageUrl} class=" w-full object-cover left-0" src={videoUrl}></video>
    <div class={backgroundImageClasses}>
      <div class="f-col w-full justify-start items-center md:items-start md:hidden">
        <div class={liveNowClasses}><Icon type="circle" fillClass="fill-positive-sentiment" />Live now</div>
        <div class="text-[18px] font-bold text-primary-link-hover uppercase">Starting on Feb 27th, 2025</div>
      </div>
      <div class={contentWrapperClasses}>
        <div class={innerContentClasses}>
          <div class={descriptionWrapperClasses}>
            <div class=" w-full hidden md:f-col h-[54px]">
              <div class={liveNowClasses}><Icon type="circle" fillClass="fill-positive-sentiment" />Live now</div>
              <div class="text-[18px] font-bold text-primary-link-hover uppercase">Starting on Feb 27th, 2025</div>
            </div>
            <div class="f-col md:f-row w-full md:min-w-[326px] gap-[20px] md:gap-0">
              <div class={descriptionTextClasses}>
                <span class="text-primary-link-hover">Spot trading</span>
                <span class="text-white">27/02 - 13/03 </span>
              </div>
              <div class={descriptionTextClasses}>
                <span class="text-primary-link-hover">Perp trading</span>
                <span class="text-white">14/03 - 28/03 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    <!-- <LiquidityRoyalCarousel /> -->
  </div>
</div>
<div class={additionalInfoWrapperClasses}>
  <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Address..." />
  <LastUpdated {lastUpdated} class="order-last" />
</div>

<style lang="css">
  .custom-gradient {
    background: linear-gradient(180deg, rgba(33, 24, 52, 0) 0%, rgba(33, 24, 52, 0.7) 100%);
  }
</style>

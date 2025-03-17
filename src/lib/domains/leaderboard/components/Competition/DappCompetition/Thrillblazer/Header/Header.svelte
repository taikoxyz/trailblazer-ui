<script lang="ts">
  import { getContext } from 'svelte';
  import { json, t } from 'svelte-i18n';

  import { LastUpdated } from '$lib/domains/leaderboard/components';
  import Search from '$lib/domains/leaderboard/components/Search.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { competitionSlug } from '$lib/domains/leaderboard/stores/dappCompetitionStore';
  import type { LoadLeaderboardDataType } from '$lib/domains/leaderboard/types/shared/types';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { classNames } from '$shared/utils/classNames';
  import { numberToRoman } from '$shared/utils/numberToRoman';

  import type { CompetitionInfo } from '../../../types';
  import { thrillblazerDetails } from '../thrillblazerDetails';
  import PrizePool from './PrizePool.svelte';
  import SideBar from './SideBar.svelte';

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadCompetitionLeaderboardData');
  const pageInfo = getContext<PaginationInfo<DappLeaderboardItem>>('dappsCompetitionPageInfo');

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  export let lastUpdated: Date;

  let selectedCompetitionInfo = null as CompetitionInfo | null;
  let totalAmount = '';
  $: {
    selectedCompetitionInfo = thrillblazerDetails[edition];
    // Update totalAmount based on activeSeason
    totalAmount = $t(`leaderboard.thrillblazers.edition${edition}.prize_breakdown.total`);
  }
  const wrapperClasses = classNames(
    'flex',
    'justify-start',
    'border',
    'border-[yellow]',
    'w-full',
    'h-full',
    'relative',
    'w-full',
    'items-start',
  );

  const headerContentClasses = classNames(
    'flex',
    'flex-col',
    'border',
    'border-[red]',
    'h-full',
    'xl:max-w-[1229px]',
    'lg:max-w-[927px]',
    'md:max-w-[670px]',
    'relative',
    // 'mt-[40px]',
    'w-full',
    'items-center',
  );

  const h1Classes = classNames(
    'relative',
    'text-left',
    'font-bold',
    'font-clash-grotesk',
    'text-[65px]',
    'leading-none',
    'tracking-[9.74px]',
    'xl:tracking-[9.1px]',
    'uppercase',
    'animate-flicker',
    'stroke-2',
    'text-transparent',
    'text-stroke-neon-red',
    'drop-shadow-neon-red',
    'mb-[85px]',
    //md
    'md:self-start',
    'md:ml-[80px]',
    'md:text-[101.775px]',
    'md:font-semibold',
    'md:leading-[101.775px]',
    'md:tracking-[15.266px]',
    // 'md:mt-[109px]',
    //lg
    'lg:text-[150.39px]',
    'lg:font-semibold',
    'lg:leading-[150.39px]',
    'lg:tracking-[22.558px]',
    'lg:uppercase',
    'lg:stroke-4',
    //  'lg:mt-[83px]',
    'lg:ml-[85px]',
    //xl
    'xl:ml-[293px]',
  );

  const runesLeftClasses = classNames(
    'hidden',
    'md:block',
    'lg:hidden',
    'absolute',
    'top-[0px]',
    'left-0',
    'z-10',
    'h-[500.118px]',
    'w-[87.395px]',
  );

  const runesLeftClassesLg = classNames(
    'hidden',
    'lg:block',
    'xl:hidden',
    'absolute',
    'top-[0px]',
    'left-0',
    'z-10',
    'h-[500.118px]',
    'w-[87.395px]',
  );

  const runesLeftClassesXl = classNames(
    'hidden',
    'xl:block',
    'absolute',
    'top-[0px]',
    'left-0',
    'z-10',
    'h-[555.141]',
    'w-[185.21px]',
  );

  const runesRightClasses = classNames(
    'hidden',
    'md:block',
    'absolute',
    'right-0',
    'top-[24px]',
    'w-[21.7px]',
    'lg:w-[30px]',
  );
  const blazersClasses = classNames(
    'absolute',
    'top-[80px]',
    'w-[440px]',
    //  'top-[35px]',
    // 'left-[95px]',
    //md
    // 'md:w-[372.246px]',
    //   'md:top-[165px]',
    // 'md:left-[223.53px]',
    //lg
    //'lg:w-[550.059px]',
    // 'lg:left-[300px]',
    //xl
    // 'xl:left-[481.059px]',
  );
  const descriptionClasses = classNames(
    ' text-secondary-content',
    'text-center',
    'max-w-[297px]',
    //md
    'md:max-w-[449px]',
    'md:text-[16px]',
    'md:font-normal',
    'md:leading-[24px]',
    //'my-[50px]',
    //lg
    'lg:max-w-[538px]',
    //xl
    // 'xl:my-[40px]',
  );

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

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last', 'z-0', 'ml-[3px]');

  $: description = $t(`leaderboard.thrillblazers.edition${edition}.description`);
  $: prizes = $json(`leaderboard.thrillblazers.edition${edition}.prize_breakdown`) as Record<string, string>;
  $: edition = parseInt($competitionSlug);

  // ===============================================================================================

  const borderedRowClasses = classNames(
    'flex',
    'justify-center',
    'items-center',
    'border',
    'border-grey-600',
    'h-[57px]',
    'w-full',
  );

  const editionClasses = classNames(
    'uppercase',
    'text-center',
    'border-r',
    'border-l',
    'w-[740px]',
    'max-w-full',
    'h-full',
    'flex',
    'items-center',
    'justify-center',
    'border-grey-600',
    'text-pink-400',
    'text-[16px]/[120%] font-[700]',
  );

  const frameClasses = classNames(
    'f-col',
    'border border-[blue]',
    'relative',
    // 'mt-[40px]',
    'w-full',
    'items-center',
  );

  const prizePoolWrapperClasses = classNames('py-[30px]', 'w-full', 'flex', 'justify-between', 'items-center');
  const prizePoolClasses = classNames('w-full', 'gap-[5px]', 'flex', 'flex-col', 'justify-center', 'items-center');
  const prizePoolLabelClasses = classNames(
    'text-[16px]/[120%]',
    'font-[700]',
    'text-center',
    'text-pink-400',
    'uppercase',
  );
  const prizePoolValueClasses = classNames('text-grey-10', 'text-[24px]/[120%]', 'font-[700]', 'text-center');

  const lineClasses = classNames('w-full', 'h-[10px]');
  const lineReverseClasses = classNames(lineClasses, 'scale-x-[-1]');

  const prizesWrapper = classNames('grid grid-cols-5');

  const prizeItemClasses = classNames(
    'flex',
    'gap-4',
    'border',
    'border-grey-600',
    'py-[16px]',
    'items-center',
    'w-full',
    'justify-center',
  );
  const prizeImageClasses = classNames('size-[26px]');
  const prizeInfoClasses = classNames(
    'text-[18x]/[120%]',
    'font-[500]',
    'leading-[32px]',
    'uppercase',
    'font-["Clash Grotesk"]',
  );
  const prizeTokenNameClasses = classNames('text-secondary-content');
  const priceWrapperClasses = classNames(
    'grid',
    'grid-cols-5',
    // 'mt-[34px]',
    // 'mb-[113px]',
    'w-full',
  );
  const h2Classes = classNames(
    'text-center',
    'text-[#5DDEB5]',
    'font-[Clash Grotesk]',
    'text-[20px]',
    'font-medium',
    'leading-normal',
    'tracking-[4px]',
    'uppercase',
    'inline-block',
  );
  const h3Classes = classNames(
    'font-[Clash Grotesk]',
    'text-[24px]',
    'font-medium',
    'leading-normal',
    'tracking-[4.8px]',
    'text-center',
    'uppercase',
  );
</script>

<div class={wrapperClasses}>
  <SideBar />

  <div class={headerContentClasses}>
    <div class={borderedRowClasses}></div>
    <div class={borderedRowClasses}>
      {#if edition}
        <div class={editionClasses}>
          Edition {numberToRoman(edition)}
        </div>
      {/if}
    </div>

    <div class={frameClasses}>
      <h1 class={h1Classes}>Thrill</h1>

      <img src="/blazers.svg" alt="Thrillblazers" class={blazersClasses} />
      <span class={descriptionClasses}>
        {description}
      </span>

      <div class={prizePoolWrapperClasses}>
        <img class={lineClasses} alt="line" src="/thrillblazers/pink-line.svg" />

        <div class={prizePoolClasses}>
          <div class={prizePoolLabelClasses}>Prize Pool</div>
          <div class={prizePoolValueClasses}>100K TAIKO</div>
        </div>

        <img class={lineReverseClasses} alt="line" src="/thrillblazers/pink-line.svg" />
      </div>
    </div>

    {#if selectedCompetitionInfo}
      <div class={priceWrapperClasses}>
        {#each selectedCompetitionInfo.prizes as prize}
          <div class={prizeItemClasses}>
            <img src={prize.image} alt="{prize.amount} TAIKO Tokens" class={prizeImageClasses} />
            <div class={prizeInfoClasses}>
              {prize.amount} TAIKO
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <SideBar />
</div>
<div class={secondaryContentClasses}>
  <div class={ctaWrapperClasses}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class={ctaTextClasses}>{@html $t('leaderboard.whitelist.cta')}</div>
    <LastUpdated class={lastUpdatedClasses} {lastUpdated} />
  </div>
  <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Dapps..." />
</div>

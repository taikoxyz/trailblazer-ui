<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { LastUpdated } from '$lib/domains/leaderboard/components';
  import Search from '$lib/domains/leaderboard/components/Search.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import type { LoadLeaderboardDataType } from '$lib/domains/leaderboard/types/shared/types';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { classNames } from '$shared/utils/classNames';
  import { numberToRoman } from '$shared/utils/numberToRoman';

  import PrizePool from './PrizePool.svelte';

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadCompetitionLeaderboardData');
  const pageInfo = getContext<PaginationInfo<DappLeaderboardItem>>('dappsCompetitionPageInfo');

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  export let lastUpdated: Date;

  const wrapperCLasses = classNames('f-col', 'relative', 'mt-[40px]', 'w-full', 'items-center');

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
    'md:mt-[109px]',
    //lg
    'lg:text-[150.39px]',
    'lg:font-semibold',
    'lg:leading-[150.39px]',
    'lg:tracking-[22.558px]',
    'lg:uppercase',
    'lg:stroke-4',
    'lg:mt-[83px]',
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
    'top-[35px]',
    'left-[95px]',
    //md
    'md:w-[372.246px]',
    'md:top-[165px]',
    'md:left-[223.53px]',
    //lg
    'lg:w-[550.059px]',
    'lg:left-[300px]',
    //xl
    'xl:left-[481.059px]',
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
    'my-[50px]',
    //lg
    'lg:max-w-[538px]',
    //xl
    'xl:my-[40px]',
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

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last', 'z-0', 'ml-[2px]');

  $: description = $t(`leaderboard.thrillblazers.${edition}.description`);

  const edition = getContext('thrillblazerEdition') as number;
</script>

<div class={wrapperCLasses}>
  <h1 class={h1Classes}>Thrill</h1>
  <img class={runesLeftClasses} src="/header/thrillblazer/runes-left.svg" alt="runes" />
  <img class={runesLeftClassesLg} src="/header/thrillblazer/runes-left-lg.svg" alt="runes" />
  <img class={runesLeftClassesXl} src="/header/thrillblazer/runes-left-xl.svg" alt="runes" />

  <img src="/blazers.svg" alt="Thrillblazers" class={blazersClasses} />

  {#if edition}
    <h1 class="mt-[40px]">- Edition {numberToRoman(edition)} -</h1>
  {/if}

  <span class={descriptionClasses}>
    {description}
  </span>

  <img src="/header/thrillblazer/runes-right.svg" alt="runes" class={runesRightClasses} />

  <PrizePool />
</div>
<div class={secondaryContentClasses}>
  <div class={ctaWrapperClasses}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class={ctaTextClasses}>{@html $t('leaderboard.whitelist.cta')}</div>
    <LastUpdated class={lastUpdatedClasses} {lastUpdated} />
  </div>
  <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Dapps..." />
</div>

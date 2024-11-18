<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { LastUpdated } from '$lib/domains/leaderboard/components';
  import type { CompetitionInfo } from '$lib/domains/leaderboard/components/Competition/types';
  import Search from '$lib/domains/leaderboard/components/Search.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import type { LoadLeaderboardDataType } from '$lib/domains/leaderboard/types/shared/types';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { classNames } from '$shared/utils/classNames';

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
    'text-stroke-neon-blue',
    'drop-shadow-neon-blue',
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

  const prizeItemClasses = classNames('f-center', 'gap-4', 'w-fit', 'justify-center', 'md:w-[169px]');

  const prizeImageClasses = classNames('size-[48px]');

  const prizeInfoClasses = classNames('flex', 'flex-col');

  const prizeAmountClasses = classNames(
    'text-[26px]',
    'font-bold',
    'leading-[32px]',
    'uppercase',
    'font-clash-grotesk',
  );

  const prizeTokenNameClasses = classNames('text-secondary-content');

  const descriptionClasses = classNames(
    ' text-secondary-content',
    'text-center',
    'max-w-[297px]',
    //md
    'md:max-w-[449px]',
    'md:text-[16px]',
    'md:font-normal',
    'md:leading-[24px]',
    'md:my-[50px]',
    //lg
    'lg:max-w-[538px]',
    //xl
    'xl:my-[40px]',
  );

  const competitionInfo: CompetitionInfo = {
    title: '',
    description: $t('leaderboard.gaming.banner.description'),
    prizeTitle: $t('leaderboard.gaming.prize.1'),
    prizeSubtitle: $t('leaderboard.gaming.prize.2'),
    prizes: [
      {
        image: '/first.svg',
        amount: $t('leaderboard.thrillblazer.prize_breakdown.first.amount'),
      },
      {
        image: '/second.svg',
        amount: $t('leaderboard.thrillblazer.prize_breakdown.second.amount'),
      },
      {
        image: '/third.svg',
        amount: $t('leaderboard.thrillblazer.prize_breakdown.third.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: $t('leaderboard.thrillblazer.prize_breakdown.fourth.amount'),
      },
      {
        image: '/default-prize.svg',
        amount: $t('leaderboard.thrillblazer.prize_breakdown.fifth.amount'),
      },
    ],
  };

  const h2Classes = classNames(
    'text-center',
    'text-[#5DDEB5]	',
    'font-clash-grotesk',
    'text-[20px]',
    'font-medium',
    'leading-normal',
    'tracking-[4px]',
    'uppercase',
    'inline-block ',
  );

  const h3Classes = classNames(
    'font-clash-grotesk',
    'text-[24px]',
    'font-medium',
    'leading-normal',
    'tracking-[4.8px]',
    'text-center',
    'uppercase',
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

  const priceWrapperClasses = classNames(
    'f-col',
    'items-center',
    'justify-center',
    'gap-[30px]',
    'mt-[34px]',
    'mb-[113px]',
    'w-full',
    //md
    'md:f-row',
    'md:flex-wrap',
    //xl
    'xl:justify-between',
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

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last', 'z-0');
</script>

<div class={wrapperCLasses}>
  <h1 class={h1Classes}>Chill</h1>
  <img class={runesLeftClasses} src="/header/thrillblazer/runes-left.svg" alt="runes" />
  <img class={runesLeftClassesLg} src="/header/thrillblazer/runes-left-lg.svg" alt="runes" />
  <img class={runesLeftClassesXl} src="/header/thrillblazer/runes-left-xl.svg" alt="runes" />

  <img src="/blazers.svg" alt="Thrillblazers" class={blazersClasses} />

  <span class={descriptionClasses}>
    Chill-Blazer launches Nov 18th. Calling all gaming and SocialFi dApps: Blaze new trails, fuel Taiko's momentum, and
    seize your chance for legendary rewards!
  </span>

  <img src="/header/thrillblazer/runes-right.svg" alt="runes" class={runesRightClasses} />

  <h2 class={h2Classes}>
    <span class="inline-block text-white align-middle">&#x25C6</span>
    Prize pool
    <span class="text-white align-baseline">&#x25C6</span>
  </h2>
  <h3 class={h3Classes}>140k TAIKO Tokens</h3>

  <div class={priceWrapperClasses}>
    {#each competitionInfo.prizes as prize}
      <div class={prizeItemClasses}>
        <img src={prize.image} alt="{prize.amount} TAIKO Tokens" class={prizeImageClasses} />
        <div class={prizeInfoClasses}>
          <span class={prizeAmountClasses}>{prize.amount}</span>
          <span class={prizeTokenNameClasses}>{$t('leaderboard.defi.tokenName')}</span>
        </div>
      </div>
    {/each}
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

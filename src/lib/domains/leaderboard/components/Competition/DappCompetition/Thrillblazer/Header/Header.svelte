<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

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

  const loadLeaderboardData = getContext<LoadLeaderboardDataType>('loadCompetitionLeaderboardData');
  const pageInfo = getContext<PaginationInfo<DappLeaderboardItem>>('dappsCompetitionPageInfo');

  const handleSearch = async (value: string) => {
    await loadLeaderboardData(pageInfo.page, value);
  };

  export let lastUpdated: Date;

  let selectedCompetitionInfo = null as CompetitionInfo | null;
  $: {
    selectedCompetitionInfo = thrillblazerDetails[edition];
  }
  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'border',
    'border-grey-600',
    'justify-stretch',
    'items-stretch',
    'h-full',
    'relative',
    'w-full',
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
    // 'md:self-start',
    // 'md:ml-[80px]',
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
    //  'lg:ml-[85px]',
    //xl
    //  'xl:ml-[293px]',
  );

  const blazersClasses = classNames('absolute', 'top-[50%]', 'w-[440px]');
  const descriptionClasses = classNames(
    ' text-secondary-content',
    'text-center',
    'max-w-[297px]',
    'mt-[20px]',
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
    'mt-[100px]',
  );

  const ctaWrapperClasses = classNames('flex', 'flex-col', 'order-2');

  const ctaTextClasses = classNames('text-secondary-content');

  const lastUpdatedClasses = classNames('mt-[30px]', 'mb-[40px]', 'md:my-[20px]', 'lg:my-[10px]', 'lg:order-1');

  const searchClasses = classNames('w-full', 'lg:w-[400px]', 'lg:order-1', 'order-last', 'z-0', 'ml-[3px]');

  $: description = $t(`leaderboard.thrillblazers.edition${edition}.description`);
  $: edition = parseInt($competitionSlug);

  const editionClasses = classNames(
    'uppercase',
    'text-center',
    'w-[740px]',
    'max-w-full',
    'h-full',
    'flex',
    'items-center',
    'justify-center',
    'text-pink-400',
    'text-[16px]/[120%]',
    'font-[700]',
  );

  const frameClasses = classNames(
    'f-col',
    'h-full',
    'mt-[20px]',
    'relative',
    'w-[calc(100%-100px]',
    'lg:w-[calc(100%-212px)]',
    'items-center',
  );

  const prizePoolWrapperClasses = classNames(
    'absolute',
    'bottom-[50%]',
    'left-[25%]',
    'w-[50%]',
    'flex',
    'justify-between',
    'items-center',
  );
  const prizePoolClasses = classNames(
    'bg-grey-900',
    'w-full',
    'gap-[5px]',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  );
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

  const prizeItemClasses = classNames(
    'flex',
    'gap-4',
    'border-grey-600',
    //'py-[16px]',
    'items-center',
    'lg:w-full',
    'md:w-[30%]',
    'justify-center',
    //md
    'md:border',
    // lg
    'lg:border-l',
    'lg:border-r',
    'lg:first:border-l-0',
    'lg:last:border-r-0',
  );
  const prizeImageClasses = classNames('size-[26px]');
  const prizeInfoClasses = classNames(
    'text-[18x]/[120%]',
    'font-[500]',
    'leading-[32px]',
    'uppercase',
    'font-["Clash Grotesk"]',
  );
  const priceWrapperClasses = classNames(
    // lg
    'lg:grid',
    'lg:grid-cols-5',
    // md
    'md:flex',
    'md:flex-wrap',
    'md:justify-center',
    'bg-[green]',
    'md:items-center',
    'w-[calc(100%-100px]',
    'lg:w-[calc(100%-212px)]',
  );

  const borderedCellSmClasses = classNames(
    'lg:w-[106px]',
    'border-l',
    'border-r',
    'first:border-l-0',
    'last:border-r-0',
    'border-grey-600',
    'h-[57px]',
    'w-[50px]',
  );

  const borderedRowClasses = classNames(
    'flex',
    'justify-between',
    'relative',
    'items-center',
    'border-b',
    'border-grey-600',
    'min-h-[57px]',
    'w-full',
  );

  const logoClasses = classNames('relative', 'flex', 'flex-col', 'justify-center', 'items-center', 'w-max');

  const linesClasses = classNames(
    'border-r',
    'border-l',
    'lg:w-[106px]',
    'w-[50px]',
    'h-full',
    'border-grey-600',
    'bg-cover',
  );

  const backgroundClasses = classNames('top-0', 'absolute', 'w-full', 'h-full', 'bg-fit');
</script>

<div class={wrapperClasses}>
  <div class={borderedRowClasses}>
    <div class={borderedCellSmClasses}></div>
    <div class={borderedCellSmClasses}></div>
  </div>

  <div class={classNames(borderedRowClasses)}>
    <div class={borderedCellSmClasses}></div>
    {#if edition}
      <div class={editionClasses}>
        Edition {numberToRoman(edition)}
      </div>
    {/if}
    <div class={borderedCellSmClasses}></div>
  </div>

  <div class={classNames(borderedRowClasses, 'h-[416px]')}>
    <div class={linesClasses} style="background-image:url(/thrillblazers/diagonal-lines.svg)"></div>
    <div class={frameClasses}>
      <div class={backgroundClasses} style="background-image:url(/thrillblazers/cubes-bg.svg)"></div>

      <div class={logoClasses}>
        <h1 class={h1Classes}>Thrill</h1>

        <img src="/blazers.svg" alt="Thrillblazers" class={blazersClasses} />
      </div>
      <span class={descriptionClasses}>
        {description}
      </span>
    </div>
    <div class={linesClasses} style="background-image:url(/thrillblazers/diagonal-lines.svg)"></div>
  </div>

  <div class={borderedRowClasses}>
    <div class={borderedCellSmClasses}></div>
    <div class={prizePoolWrapperClasses}>
      <img class={lineClasses} alt="line" src="/thrillblazers/pink-line.svg" />

      <div class={prizePoolClasses}>
        <div class={prizePoolLabelClasses}>Prize Pool</div>
        <div class={prizePoolValueClasses}>100K TAIKO</div>
      </div>

      <img class={lineReverseClasses} alt="line" src="/thrillblazers/pink-line.svg" />
    </div>

    <div class={borderedCellSmClasses}></div>
  </div>

  {#if selectedCompetitionInfo}
    <div class={borderedRowClasses}>
      <div class={borderedCellSmClasses}></div>
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
      <div class={borderedCellSmClasses}></div>
    </div>
  {/if}
</div>
<div class={secondaryContentClasses}>
  <div class={ctaWrapperClasses}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class={ctaTextClasses}>{@html $t('leaderboard.whitelist.cta')}</div>
    <LastUpdated class={lastUpdatedClasses} {lastUpdated} />
  </div>
  <Search className={searchClasses} onSearch={handleSearch} placeholder="Search Dapps..." />
</div>

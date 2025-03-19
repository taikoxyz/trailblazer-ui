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
  import { isMobile } from '$shared/utils/responsiveCheck';

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
    'text-[77px]',
    'mt-[43px]',
    'leading-none',
    'tracking-[9.74px]',
    'xl:tracking-[9.1px]',
    'uppercase',
    'animate-flicker',
    'stroke-2',
    'text-transparent',
    'text-stroke-neon-red',
    'drop-shadow-neon-red',
    'mb-[45px]',
    //md
    'md:text-[101.775px]',
    'md:font-semibold',
    'md:leading-[101.775px]',
    'md:tracking-[15.266px]',
    'md:mb-[60px]',
    //lg
    'lg:text-[150.39px]',
    'lg:font-semibold',
    'lg:leading-[150.39px]',
    'lg:tracking-[22.558px]',
    'lg:uppercase',
    'lg:stroke-4',
  );

  const blazersClasses = classNames('absolute', 'top-[55%]', 'w-[440px]');
  const descriptionClasses = classNames(
    'text-secondary-content',
    'text-center',
    'relative',
    'max-w-[297px]',
    'z-50',
    'mt-[20px]',
    //md
    'md:max-w-[449px]',
    'md:text-[16px]',
    'md:font-normal',
    'md:leading-[24px]',
    //lg
    'lg:max-w-[538px]',
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
    'w-full',
    'h-[57px]',
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
    'w-full',
    'md:w-[calc(100%-212px)]',
    'items-center',
  );

  const prizePoolWrapperClasses = classNames(
    'absolute',
    'bottom-[50%]',
    'left-0',
    'md:w-[calc(100%-212px)]',
    'md:left-[106px]',
    'w-full',
    'flex',
    'overflow-hidden',
    'justify-center',
    'items-center',
  );
  const prizePoolClasses = classNames(
    'bg-grey-900',
    'w-full',
    'min-w-[200px]',
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
    'items-center',
    'w-full',
    'h-[57px]',
    'md:w-[25%]',
    'md:h-full',
    'justify-center',
    'border-t',
    'md:border-t-0',
    'md:border-b-0',
    'md:border-l-0',
    'md:border-r',
    'md:first:border-l',
  );
  const prizeImageClasses = classNames('size-[26px]');
  const prizeInfoClasses = classNames(
    'text-[18x]/[120%]',
    'font-[500]',
    'leading-[32px]',
    'uppercase',
    'font-["Clash Grotesk"]',
  );

  const priceRowClasses = classNames(
    'flex',
    'flex-col',
    'md:flex-row',
    'justify-center',
    'items-center',
    'w-full',
    'md:w-[calc(100%-212px)]',
    'md:h-[57px]',
  );

  const unBorderedRowClasses = classNames(
    'flex',
    'justify-between',
    'relative',
    'items-stretch',
    'min-h-[57px]',
    'w-full',
  );
  const borderedRowClasses = classNames(unBorderedRowClasses, 'border-b', 'border-grey-600');

  const logoClasses = classNames('z-50', 'relative', 'flex', 'flex-col', 'justify-center', 'items-center', 'w-max');

  const linesClasses = classNames(
    'hidden',
    'md:flex',
    'lg:w-[106px]',
    'w-[50px]',
    'h-full',
    'border-grey-600',
    'bg-cover',
    'first:border-r',
    'last:border-l',
  );

  const horizontalLinesClasses = classNames(
    'h-[57px]',

    'w-full',
    'flex',
    'justify-center',
    'items-center',
  );

  const backgroundClasses = classNames('z-0', 'top-0', 'absolute', 'w-full', 'h-full', 'bg-fit');
</script>

<div class={wrapperClasses}>
  <div class={borderedRowClasses}>
    {#if $isMobile}
      <div class={horizontalLinesClasses}>
        <img alt="Lines" src="/thrillblazers/diagonal-lines-sm.svg" />
      </div>
    {/if}
  </div>

  <div class={classNames(borderedRowClasses)}>
    {#if edition}
      <div class={editionClasses}>
        Edition {numberToRoman(edition)}
      </div>
    {/if}
  </div>

  <div class={classNames(borderedRowClasses, 'h-[415px]')}>
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

  <div class={$isMobile ? unBorderedRowClasses : borderedRowClasses}>
    <div class={prizePoolWrapperClasses}>
      {#if $isMobile}
        <img class={lineClasses} alt="line" src="/thrillblazers/pink-line-sm.svg" />
      {:else}
        <img class={lineClasses} alt="line" src="/thrillblazers/pink-line.svg" />
      {/if}
      <div class={prizePoolClasses}>
        <div class={prizePoolLabelClasses}>Prize Pool</div>
        <div class={prizePoolValueClasses}>150K TAIKO</div>
      </div>
      {#if $isMobile}
        <img class={lineReverseClasses} alt="line" src="/thrillblazers/pink-line-sm.svg" />
      {:else}
        <img class={lineReverseClasses} alt="line" src="/thrillblazers/pink-line.svg" />
      {/if}
    </div>
  </div>

  {#if selectedCompetitionInfo}
    <div class={$isMobile ? unBorderedRowClasses : borderedRowClasses}>
      <div></div>
      <div class={priceRowClasses}>
        {#each selectedCompetitionInfo.prizes.slice(0, 3) as prize}
          <div class={prizeItemClasses}>
            <img src={prize.image} alt="{prize.amount} TAIKO Tokens" class={prizeImageClasses} />
            <div class={prizeInfoClasses}>
              {prize.amount} TAIKO
            </div>
          </div>
        {/each}
      </div>
      <div></div>
    </div>

    <div class={unBorderedRowClasses}>
      <div></div>
      <div class={priceRowClasses}>
        {#each selectedCompetitionInfo.prizes.slice(3, selectedCompetitionInfo.prizes.length) as prize}
          <div class={prizeItemClasses}>
            <img src={prize.image} alt="{prize.amount} TAIKO Tokens" class={prizeImageClasses} />
            <div class={prizeInfoClasses}>
              {prize.amount} TAIKO
            </div>
          </div>
        {/each}
      </div>
      <div></div>
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

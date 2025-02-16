<script lang="ts">
  import { getContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';

  import type { CompetitionInfo } from '../../Competition/types';

  const log = getLogger('ThrillblazersHeader');

  const prizeItemClasses = classNames('f-center', 'gap-4', 'w-fit', 'justify-center', 'md:w-[169px]');
  const prizeImageClasses = classNames('size-[48px]');
  const prizeInfoClasses = classNames('flex', 'flex-col');
  const prizeAmountClasses = classNames(
    'text-[26px]',
    'font-bold',
    'leading-[32px]',
    'uppercase',
    'font-["Clash Grotesk"]',
  );
  const prizeTokenNameClasses = classNames('text-secondary-content');
  const priceWrapperClasses = classNames(
    'f-col',
    'items-center',
    'justify-center',
    'gap-[30px]',
    'mt-[34px]',
    'mb-[113px]',
    'w-full',
    'md:f-row',
    'md:flex-wrap',
    'xl:justify-between',
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

  // Initialize reactive variables
  let selectedCompetitionInfo: CompetitionInfo = {
    title: '',
    description: '',
    prizeTitle: '',
    prizeSubtitle: '',
    prizes: [],
  };
  let totalAmount = '';

  // Reactive block to update selectedCompetitionInfo and totalAmount
  $: {
    if (edition === 1) {
      selectedCompetitionInfo = {
        title: '',
        description: '',
        prizeTitle: $t('leaderboard.gaming.prize.1'),
        prizeSubtitle: '',
        prizes: [
          { image: '/first.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.first.amount`) },
          { image: '/second.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.second.amount`) },
          { image: '/third.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.third.amount`) },
          {
            image: '/default-prize.svg',
            amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.fourth.amount`),
          },
          {
            image: '/default-prize.svg',
            amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.fifth.amount`),
          },
        ],
      };
      log('edition 1', selectedCompetitionInfo);
    } else if (edition === 2) {
      selectedCompetitionInfo = {
        title: '',
        description: '',
        prizeTitle: $t('leaderboard.gaming.prize.1'),
        prizeSubtitle: '',
        prizes: [
          { image: '/first.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.first.amount`) },
          { image: '/second.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.second.amount`) },
          { image: '/third.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.third.amount`) },
          {
            image: '/default-prize.svg',
            amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.fourth.amount`),
          },
        ],
      };
      log('edition 3', selectedCompetitionInfo);
    } else if (edition === 3) {
      selectedCompetitionInfo = {
        title: '',
        description: '',
        prizeTitle: $t('leaderboard.gaming.prize.1'),
        prizeSubtitle: '',
        prizes: [
          { image: '/first.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.first.amount`) },
          { image: '/second.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.second.amount`) },
          { image: '/third.svg', amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.third.amount`) },
          {
            image: '/default-prize.svg',
            amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.fourth.amount`),
          },
          {
            image: '/default-prize.svg',
            amount: $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.fifth.amount`),
          },
        ],
      };
      log('edition 3', selectedCompetitionInfo);
    } else {
      // Fallback for other seasons
      selectedCompetitionInfo = { title: '', description: '', prizeTitle: '', prizeSubtitle: '', prizes: [] };
      log('fallback');
    }

    // Update totalAmount based on activeSeason
    totalAmount = $t(`leaderboard.thrillblazers.${edition}.prize_breakdown.total`);
  }

  const edition = getContext('thrillblazerEdition') as number;
</script>

<h2 class={h2Classes}>
  <span class="inline-block text-white align-middle">&#x25C6</span>
  Prize pool
  <span class="text-white align-baseline">&#x25C6</span>
</h2>
<h3 class={h3Classes}>{totalAmount}</h3>

<div class={priceWrapperClasses}>
  {#each selectedCompetitionInfo.prizes as prize}
    <div class={prizeItemClasses}>
      <img src={prize.image} alt="{prize.amount} TAIKO Tokens" class={prizeImageClasses} />
      <div class={prizeInfoClasses}>
        <span class={prizeAmountClasses}>{prize.amount}</span>
        <span class={prizeTokenNameClasses}>{$t('leaderboard.defi.tokenName')}</span>
      </div>
    </div>
  {/each}
</div>

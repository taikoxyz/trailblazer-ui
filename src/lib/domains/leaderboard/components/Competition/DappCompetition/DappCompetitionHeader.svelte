<script lang="ts">
  import { t } from 'svelte-i18n';

  import { classNames } from '$shared/utils/classNames';

  import type { CompetitionInfo } from '../types';

  const wrapperCLasses = classNames('f-col', 'relative', 'mt-[40px]');

  const h1Classes = classNames(
    'relative',
    'text-left',
    'font-bold',
    'font-["Clash_Grotesk"]',
    'text-[65px]',
    'lg:text-[64px]',
    'xl:text-[70px]',
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
  );

  const prizeItemClasses = classNames('f-center', 'gap-4', 'w-fit', 'justify-center');

  const prizeImageClasses = classNames('size-[48px]');

  const prizeInfoClasses = classNames('flex', 'flex-col');

  const prizeAmountClasses = classNames('text-[26px]', 'font-semibold', 'leading-[32px]');

  const prizeTokenNameClasses = classNames('text-secondary-content');

  const descriptionClasses = classNames(' text-secondary-content', 'text-center', 'max-w-[297px]');

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
    'font-[Clash Grotesk]',
    'text-[20px]',
    'font-medium',
    'leading-normal',
    'tracking-[4px]',
    'uppercase',
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

<div class={wrapperCLasses}>
  <h1 class={h1Classes}>Thrill</h1>
  <img src="/blazers.svg" alt="Thrillblazers" class="absolute top-[35px] left-[95px]" />

  <span class={descriptionClasses}>
    Thrill-Blazer launches Sept 18. Calling all gaming and SocialFi dApps: Blaze new trails, fuel Taiko's momentum, and
    seize your chance for legendary rewards!
  </span>

  <div class="mt-[40px]">
    <h2 class={h2Classes}>Prize pool</h2>
    <h3 class={h3Classes}>140k TAIKO Tokens</h3>

    <div class="f-col items-center justify-center gap-[30px] mt-[34px] mb-[113px]">
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
</div>

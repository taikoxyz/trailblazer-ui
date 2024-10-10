<script lang="ts">
  import { t } from 'svelte-i18n';

  import { classNames } from '$shared/utils/classNames';

  import LastUpdatedHeader from '../LastUpdatedHeader.svelte';
  import type { CompetitionInfo } from './types';

  export let competitionInfo: CompetitionInfo;
  export let lastUpdated: Date | null = null;

  const { title, description, prizeTitle, prizeSubtitle, prizes } = competitionInfo;

  // Root container classes
  const rootClasses = classNames('f-center', 'flex-col');

  // Title wrapper classes
  const titleWrapperClasses = classNames('flex', 'justify-center', 'lg:space-x-[40px]', 'mb-[30px]', 'w-full');

  // Left laser image classes
  const leftLaserLargeClasses = classNames('hidden', 'xl:block', 'max-w-[300px]');

  const leftLaserSmallClasses = classNames('block', 'xl:hidden', 'lg:max-w-[150px]', 'hidden', 'lg:block');

  // Title text classes
  const titleClasses = classNames(
    'flex',
    'w-full',
    'max-w-[570px]',
    'font-normal',
    'font-medium',
    'leading-[52px]',
    'tracking-[-0.45px]',
    'font-clash-grotesk',
    'text-center',
    'text-[32px]/[38px]',
    'lg:text-[45px]/[52px]',
  );

  // Right laser image classes
  const rightLaserLargeClasses = classNames('hidden', 'rotate-180', 'xl:block', 'max-w-[300px]');

  const rightLaserSmallClasses = classNames(
    'block',
    'rotate-180',
    'xl:hidden',
    'lg:max-w-[150px]',
    'hidden',
    'lg:block',
  );

  // Description text classes
  const descriptionClasses = classNames(
    'text-secondary-content',
    'body-regular',
    'text-center',
    'max-w-[485px]',
    'pb-[80px]',
  );

  // Prize box classes
  const prizeBoxClasses = classNames(
    'f-col',
    'lg:flex-row',
    'relative',
    'border-2',
    'border-primary-border-hover',
    'rounded-3xl',
    'items-center',
    'justify-center',
    'w-full',
    'max-w-[764px]',
    'pt-[90px]',
    'lg:pt-[58px]',
    'pb-[51px]',
    'gap-[30px]',
    'lg:gap-[83px]',
  );

  // Prize title classes
  const prizeTitleClasses = classNames(
    'f-col',
    'lg:block',
    'absolute',
    'border-2',
    'body-bold',
    'bordered-wrap',
    'top-0',
    'left-1/2',
    'transform',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'px-5',
    'py-4',
    'min-w-[209px]',
    'rounded-full',
    'text-center',
    'bg-primary-background',
  );

  // Prize subtitle classes
  const prizeSubtitleClasses = classNames('text-primary-brand');

  // Individual prize item classes
  const prizeItemClasses = classNames('f-center', 'gap-4', 'w-fit');

  const prizeImageClasses = classNames('size-[48px]');

  const prizeInfoClasses = classNames('flex', 'flex-col');

  const prizeAmountClasses = classNames('title-section-bold');

  const prizeTokenNameClasses = classNames('body-regular');
</script>

<!-- Competition Information -->
<div class={rootClasses}>
  <!-- Title -->
  <div class={titleWrapperClasses}>
    <img src="/competitionInfo/laser.svg" alt="left laser" class={leftLaserLargeClasses} />
    <img src="/competitionInfo/laser-sm.svg" alt="left laser" class={leftLaserSmallClasses} />
    <div class={titleClasses}>
      {title}
    </div>
    <img src="/competitionInfo/laser.svg" alt="right laser" class={rightLaserLargeClasses} />
    <img src="/competitionInfo/laser-sm.svg" alt="right laser" class={rightLaserSmallClasses} />
  </div>
  <div class={descriptionClasses}>
    {description}
  </div>

  <!-- Prize box -->
  <div class={prizeBoxClasses}>
    <div class={prizeTitleClasses}>
      <span>{prizeTitle}</span>
      <span>-</span>
      <span class={prizeSubtitleClasses}>{prizeSubtitle}</span>
    </div>

    {#each prizes as prize}
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

{#if lastUpdated}
  <LastUpdatedHeader {lastUpdated} />
{/if}

<style>
  .bordered-wrap {
    padding: 16px 20px;
    background: #0b101b;
    border-radius: 40px;
    overflow: hidden;
    border: none;
  }

  .bordered-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100000px;
    padding: 2px;
    background: linear-gradient(135deg, #ff6fc8 0%, #0b101b 40%, #0b101b 60%, #ff6fc8 100%);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
</style>

<script lang="ts">
  import { t } from 'svelte-i18n';

  import type { CompetitionInfo } from './types';

  export let competitionInfo: CompetitionInfo;
  const { title, description, prizeTitle, prizeSubtitle, prizes } = competitionInfo;
</script>

<!-- Competition Information -->
<div class="f-center flex-col">
  <!-- Title -->
  <div class="flex justify-center lg:space-x-[40px] mb-[30px] w-full">
    <img src="/competitionInfo/laser.svg" alt="left laser" class="hidden xl:block" />
    <img
      src="/competitionInfo/laser-sm.svg"
      alt="left laser"
      class="block xl:hidden lg:max-w-[150px] hidden lg:block" />
    <div
      class="flex w-full max-w-[494px] font-normal font-medium leading-[52px] tracking-[-0.45px] font-clash-grotesk text-center text-[32px]/[38px] lg:text-[45px]/[52px]">
      {title}
    </div>
    <img src="/competitionInfo/laser.svg" alt="right laser" class="hidden rotate-180 xl:block" />
    <img
      src="/competitionInfo/laser-sm.svg"
      alt="right laser"
      class="block rotate-180 xl:hidden lg:max-w-[150px] hidden lg:block" />
  </div>
  <div class="text-secondary-content body-regular text-center max-w-[485px] pb-[80px]">
    {description}
  </div>

  <!-- Price box -->
  <div
    class="flex flex-col sm:flex-col lg:flex-row relative border-2 border-primary-border-hover rounded-3xl px-[90px] lg:px-[46px] pt-[90px] lg:pt-[58px] pb-[51px] gap-[30px] lg:gap-[83px]">
    <div
      class="f-col lg:block absolute border-2 body-bold bordered-wrap top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-4 min-w-[209px] rounded-full text-center bg-primary-background">
      <div class="bordered-conten">
        <span>{prizeTitle}</span>
        <span>-</span>
        <span class="text-primary-brand">{prizeSubtitle}</span>
      </div>
    </div>

    {#each prizes as prize}
      <div class="f-center gap-4 w-fit">
        <img src={prize.image} alt="{prize.amount} TAIKO Tokens" class="size-[48px]" />
        <div class="flex flex-col">
          <span class="title-section-bold">{prize.amount}</span>
          <span class="body-regular">{$t('leaderboard.defi.tokenName')}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

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

<script lang="ts">
  import { t } from 'svelte-i18n';
</script>

<!-- Competition Information -->
<div class="f-center flex-col">
  <div class="flex gap-5">
    <img src="/leaderboard/defi/left-laser-small.svg" alt="left laser" class="hidden size-[150px] lg:block xl:hidden" />
    <img src="/leaderboard/defi/left-laser.svg" alt="left laser" class="hidden xl:block" />
    <div class="display-medium-medium text-center pb-[30px] text-[32px]/[38px] lg:text-[45px]/[52px]">
      {$t('leaderboard.defi.banner.title')}
    </div>
    <img src="/leaderboard/defi/right-laser.svg" alt="right laser" class="hidden xl:block" />
    <img
      src="/leaderboard/defi/right-laser-small.svg"
      alt="right laser"
      class="hidden size-[150px] lg:block xl:hidden" />
  </div>
  <div class="text-secondary-content body-regular text-center max-w-[485px] pb-[80px]">
    {$t('leaderboard.defi.banner.description')}
  </div>

  <div
    class="flex flex-col sm:flex-col lg:flex-row relative border-2 border-primary-border-hover rounded-3xl px-[90px] lg:px-[46px] pt-[90px] lg:pt-[58px] pb-[51px] gap-[30px] lg:gap-[83px]">
    <div
      class="f-col lg:block absolute border-2 body-bold border-primary-border-hover top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-4 min-w-[209px] rounded-full text-center bg-primary-background">
      <span> {$t('leaderboard.defi.prize.1')}</span>
      <span class="text-primary-brand">{$t('leaderboard.defi.prize.2')}</span>
    </div>

    <div class="f-center gap-4 w-fit">
      <img src="/leaderboard/defi/first.svg" alt="100K TAIKO Tokens" class="size-[48px]" />
      <div class="flex flex-col">
        <span class="title-section-bold">{$t('leaderboard.defi.prize_breakdown.first.amount')}</span>
        <span class="body-regular">{$t('leaderboard.defi.tokenName')}</span>
      </div>
    </div>
    <div class="f-center gap-4 w-fit">
      <img src="/leaderboard/defi/second.svg" alt="50K TAIKO Tokens" class="size-[48px]" />
      <div class="flex flex-col">
        <span class="title-section-bold">{$t('leaderboard.defi.prize_breakdown.second.amount')}</span>
        <span class="body-regular">{$t('leaderboard.defi.tokenName')}</span>
      </div>
    </div>
    <div class="f-center gap-4 w-fit">
      <img src="/leaderboard/defi/third.svg" alt="25K TAIKO Tokens" class="size-[48px]" />
      <div class="flex flex-col">
        <span class="title-section-bold">{$t('leaderboard.defi.prize_breakdown.third.amount')}</span>
        <span class="body-regular">{$t('leaderboard.defi.tokenName')}</span>
      </div>
    </div>
  </div>
</div>

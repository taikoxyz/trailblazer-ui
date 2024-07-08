<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$components/Button/ActionButton.svelte';
</script>

<div class="container h-auto px-[20px] xl:px-[57px] relative hidden lg:flex">
  <div
    class="container w-full relative rounded-[30px] h-[250px] bg-[url('/trailbanner/defi/defi-banner-bg.svg')] overflow-hidden">
    <div class="flex justify-center items-center space-x-[60px] h-full">
      <div class="flex flex-col h-full grow w-1/3 relative">
        <img
          src="/trailbanner/defi/defi-banner-icons.png"
          alt="DeFi Banner"
          class="min-w-[540px] absolute right-[10px] bottom-[-70px]" />
      </div>
      <div class="flex flex-col w-1/3 h-full py-[32px] space-y-[12px]">
        <div
          class="f-col justify-center text-center pill center3pill max-w-[77px] min-h-[35px] px-[12spx] px-[5px] borde fill0">
          <span class="line-height-[150%]">{$t('common.week')} 4</span>
        </div>
        <span class="text-[45px] xl:text-[65px] leading-[65px] font-clash-grotesk font-bold"
          >{$t('trailbanner.defi.title')}</span>
      </div>
      <div class="flex flex-col w-1/3 space-y-[32px] py-[32px] pr-[100px]">
        <span>{$t('trailbanner.defi.description')}</span>
        <ActionButton
          href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
          priority="primary"
          class="!w-[140px]">{$t('common.learn_more')}</ActionButton>
      </div>
    </div>
  </div>
</div>

<style>
  .pill {
    border-radius: 1000px;
    border: 1px solid var(--border-dark-divider-default, #444a55);
    background: var(
      --background-dark-gradient,
      linear-gradient(204deg, rgba(93, 99, 111, 0.1) -5.09%, rgba(25, 30, 40, 0.2) 78.97%)
    );

    /* bg-blur/20% */
    backdrop-filter: blur(10px);
  }
</style>

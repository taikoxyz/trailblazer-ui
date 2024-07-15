<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$components/Button/ActionButton.svelte';
</script>

<div class="container h-auto px-[20px] xl:px-[57px] relative xl:flex hidden">
  <div
    class="w-full relative rounded-[30px] h-[250px] bg-[url('/trailbanner/defi/xl/defi-banner-bg-xl.svg')] bg-cover overflow-hidden">
    <div class="flex justify-center items-center space-x-[60px] h-full">
      <div class="flex flex-col h-full grow w-1/3 relative">
        <img
          src="/trailbanner/defi/xl/defi-banner-icons-xl.png"
          alt="DeFi Banner"
          class="min-w-[540px] absolute right-[10px] bottom-[-70px]" />
      </div>
      <div class="flex flex-col w-1/3 h-full py-[32px] space-y-[12px]">
        <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[12spx] px-[5px] borde fill0">
          <span class="line-height-[150%]">{$t('common.trail')} 4</span>
        </div>
        <span class="text-[45px] xl:text-[45px] leading-[45px] font-clash-grotesk font-bold"
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

<!-- Tablet -->

<div class="container h-auto px-[20px] xl:px-[57px] relative md:flex xl:hidden hidden">
  <div
    class="w-full relative rounded-[30px] h-[427px] bg-[url('/trailbanner/defi/lg/defi-banner-bg-lg.svg')] bg-cover overflow-hidden">
    <div class="flex justify-center items-center h-full space-x-[72px]">
      <div class="f-col h-full grow w-1/4 relative">
        <img
          src="/trailbanner/defi/lg/defi-banner-icons-lg.png"
          alt="DeFi Banner"
          class="min-w-[364px] absolute right-[-15px] top-[-30px]" />
      </div>
      <div class="flex flex-col w-3/4 h-full py-[32px] pr-[25px]">
        <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[12spx] px-[5px] borde fill0">
          <span class="line-height-[150%]">{$t('common.trail')} 4</span>
        </div>
        <span class="text-[35px] xl:text-[45px] leading-[45px] font-clash-grotesk font-bold mt-[20px] mb-[25px]"
          >{$t('trailbanner.defi.title')}</span>

        <span class="mb-[32px]">{$t('trailbanner.defi.description')}</span>
        <ActionButton
          href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
          priority="primary"
          class="!w-[140px] !max-h-[48px]">{$t('common.learn_more')}</ActionButton>
      </div>
    </div>
  </div>
</div>

<!-- Mobile -->
<div class="container h-auto px-[20px] xl:px-[57px] relative sm:flex md:hidden">
  <div
    class=" w-full relative rounded-[30px] h-[702px] bg-[url('/trailbanner/defi/sm/defi-banner-bg-sm.svg')] bg-cover overflow-hidden">
    <div class="f-col items-center px-[30px] h-full">
      <div class="f-col h-[260px] w-full relative">
        <img
          src="/trailbanner/defi/sm/defi-banner-icons-sm.png"
          alt="DeFi Banner"
          class="min-w-[422px] min-h-[302px] max-h-[302px] absolute left-[-40px] top-[-80px]" />
      </div>
      <div class="f-col justify-center items-center w-full py-[32px]">
        <div class="f-col justify-center text-center pill min-h-[35px] px-[12spx] px-[5px] borde fill0">
          <span class="line-height-[150%]">{$t('common.trail')} 4</span>
        </div>
        <span class="text-[35px] xl:text-[45px] leading-[45px] font-clash-grotesk font-bold mt-[20px] mb-[25px]"
          >{$t('trailbanner.defi.title')}</span>

        <span class="mb-[32px]">{$t('trailbanner.defi.description')}</span>
      </div>
      <div class="mb-[15px] w-full">
        <ActionButton
          href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
          priority="primary"
          class="w-full !max-h-[48px]">{$t('common.learn_more')}</ActionButton>
      </div>
    </div>
  </div>
</div>

<style>
  .pill {
    width: 90px;
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

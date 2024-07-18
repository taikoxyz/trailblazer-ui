<script lang="ts">
  import { t } from 'svelte-i18n';

  import ActionButton from '$components/Button/ActionButton.svelte';
</script>

<div class="container h-auto px-[20px] xl:px-[57px] relative xl:flex hidden">
  <div class="w-full relative rounded-[30px] h-[250px] bg-gray-800 overflow-hidden">
    <div class="flex justify-center items-center space-x-[60px] h-full">
      <div class="flex flex-col h-full w-1/2 relative justify-center items-center">
        <img src="/trailbanner/domain/xl/domain-banner-icons-xl.png" alt="DeFi Banner" class="w-[540px]" />
      </div>
      <div class="flex flex-col w-1/2 h-full py-[32px] max-w-[508px] gap-4">
        <div class="flex flex-col gap-2">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[12spx] px-[5px] borde fill0">
            <span class="line-height-[150%]">{$t('common.trail')} 5</span>
          </div>
          <span class="text-[55px] xl:text-[55px] leading-[55px] font-clash-grotesk font-bold"
            >{$t('trailbanner.domain.title')}</span>
        </div>
        <div class="flex w-full gap-3">
          <span class="text-body-regular max-w-[315px]">{$t('trailbanner.domain.description')}</span>
          <ActionButton
            href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
            priority="primary"
            class="max-w-[140px] max-h-[48px]">{$t('common.learn_more')}</ActionButton>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Tablet -->

<div class="container h-auto px-[20px] xl:px-[57px] relative md:flex xl:hidden hidden">
  <div class="w-full relative rounded-[30px] bg-gray-800 bg-cover overflow-hidden py-16">
    <div class="flex flex-col justify-center items-center h-full gap-4">
      <div class="f-col relative">
        <img src="/trailbanner/domain/lg/domain-banner-icons-lg.png" alt="DeFi Banner" class="max-w-[425px]" />
      </div>
      <div class="flex flex-col w-3/4 h-full gap-4 justify-center">
        <div class="flex flex-col gap-2">
          <div class="f-col justify-center text-center pill max-w-[77px] min-h-[35px] px-[12spx] px-[5px] borde fill0">
            <span class="line-height-[150%]">{$t('common.trail')} 5</span>
          </div>
          <span class="text-[55px] xl:text-[55px] leading-[55px] font-clash-grotesk font-bold"
            >{$t('trailbanner.domain.title')}</span>
        </div>
        <div class="flex w-full gap-3">
          <span class="text-body-regular max-w-[315px]">{$t('trailbanner.domain.description')}</span>
          <ActionButton
            href="https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM"
            priority="primary"
            class="max-w-[140px] max-h-[48px]">{$t('common.learn_more')}</ActionButton>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Mobile -->
<div class="container h-auto px-[20px] xl:px-[57px] relative sm:flex md:hidden">
  <div class=" w-full relative rounded-[30px] py-4 bg-gray-800 bg-cover overflow-hidden">
    <div class="f-col items-center px-[30px] h-full">
      <div class="f-col h-[260px] w-full relative justify-center items-center">
        <img
          src="/trailbanner/domain/sm/domain-banner-icons-sm.png"
          alt="DeFi Banner"
          class="max-w-[307px] max-h-[302px]" />
      </div>
      <div class="f-col justify-center items-center w-full py-[32px]">
        <div class="f-col justify-center text-center pill min-h-[35px] px-[12spx] px-[5px] borde fill0">
          <span class="line-height-[150%]">{$t('common.trail')} 5</span>
        </div>
        <span
          class="text-[55px] xl:text-[55px] leading-[55px] font-clash-grotesk font-bold mt-[20px] mb-[25px] text-center"
          >{$t('trailbanner.domain.title')}</span>

        <span class="text-body-regular text-center">{$t('trailbanner.domain.description')}</span>
      </div>
      <div class="w-full">
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
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.005em;

    /* bg-blur/20% */
    backdrop-filter: blur(10px);
  }
</style>

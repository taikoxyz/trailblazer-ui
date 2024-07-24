<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { PlusIcon } from '$components/Icon';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import { web3modal } from '$libs/connect';
  import { account } from '$stores/account';

  const handlePrimaryAction = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };

  const handleSecondaryAction = () => {
    goto('/about');
  };

  $: primaryButtonText = $account?.isConnected ? $t('buttons.get_started') : $t('buttons.connect_wallet');
</script>

<div class="w-full flex px-[12px] mt-[5px] md:max-h-[700px] lg:max-h-[814px] h-dvh">
  <div
    class="f-center md:f-left relative flex-col w-dvw rounded-[30px] overflow-hidden background-overlay
  bg-center
  xl:bg-[url(/splash/xl/splash.png)]
  lg:bg-[url(/splash/lg/splash.png)]
  md:bg-[url(/splash/md/splash.png)]
  bg-[url(/splash/sm/splash.png)]
  
  w-full h-full bg-cover lg:mt-[18px] px-[57px]">
    <div class="md:f-center flex justify-end mb-[8px] flex-col xl:flex-row h-dvh md:h-[815px]">
      <div class="flex-col w-full z-10 md:mt-[180px]">
        <!-- Title -->
        <div
          class="self-start font-clash-grotesk text-[23px]/[28px] tracking-[10px] xl:text-[45px]/[45px] xl:tracking-[22.5px] mb-[30px] md:mb-[60px]">
          <div class="w-full flex-col gap-5">
            <TaikoTrailblazersLogo class="w-[335px] md:w-[471px] lg:w-[558px] rounded-[20px]" />
          </div>
        </div>
        <!-- Description -->
        <div class="flex-col f-center md:f-left xl:self-start pb-10 xl:pb-10">
          <PlusIcon class="md:self-start hidden md:block md:mb-[40px]" />
          <div
            class="max-w-[262px] md:max-w-[343px] text-[22px] text-center md:text-left lg:title-subsection-regular body-regular">
            Embark on the Trailblazers Journey: Unleash your potential in the Taiko universe!
          </div>
        </div>

        <div class="gap-4 self-center xl:self-start f-col md:f-row">
          <ActionButton
            priority="primary"
            class="md:min-w-[180px] md:max-w-[180px] w-full"
            on:click={handlePrimaryAction}
            withArrow>
            {primaryButtonText}
          </ActionButton>

          <ActionButton
            priority="secondary"
            class="md:min-w-[180px] md:max-w-[180px] w-full"
            on:click={handleSecondaryAction}>{$t('buttons.learn_more')}</ActionButton>
        </div>
      </div>
    </div>
    <!-- Image -->
  </div>
</div>
<!-- 
<style>
  .background-overlay::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)); */
    background: url('/splash-gradient.svg') no-repeat center center;

    z-index: 0;
  }
</style> -->

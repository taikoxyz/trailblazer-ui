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

<div
  class="f-center relative flex-col w-dvw rounded-[30px] overflow-hidden
  
  xl:bg-[url(/desktop.png)]
  md:bg-[url(/pad.png)
  sm:bg-[url(/mobile.png)]
  xs:bg-[url(/small.png)]
  
  hidden xl:block w-full h-full bg-cover mt-[18px] xl:px-[57px]">
  <div class="f-center flex-col xl:flex-row h-dvh md:h-[815px] w-[90%]">
    <div class="f-center flex-col w-full">
      <!-- Title -->
      <div
        class="xl:self-start font-clash-grotesk text-[23px]/[28px] tracking-[10px] xl:text-[45px]/[45px] xl:tracking-[22.5px] mb-[30px] md:mb-[60px]">
        <div class="f-center w-full flex-col gap-5">
          <TaikoTrailblazersLogo class="w-[335px] xl:w-[558px] rounded-[20px]" />
        </div>
      </div>
      <!-- Description -->
      <div class="xl:self-start f-center flex-col pb-10 xl:pb-10">
        <PlusIcon class="xl:self-start hidden xl:block md:mb-[40px]" />
        <div class="max-w-[262px] xl:max-w-[343px] text-center xl:text-left lg:title-subsection-regular body-regular">
          Embark on the Trailblazers Journey: Unleash your potential in the Taiko universe!
        </div>
      </div>

      <div class="gap-4 self-center xl:self-start f-col md:f-row">
        <ActionButton priority="primary" class="min-w-[150px] max-w-[150px]" on:click={handlePrimaryAction} withArrow>
          {primaryButtonText}
        </ActionButton>

        <ActionButton priority="secondary" class="min-w-[180px] max-w-[180px]" on:click={handleSecondaryAction}
          >{$t('buttons.learn_more')}</ActionButton>
      </div>
    </div>
  </div>
  <!-- Image -->
  <div class="absolute -z-20 bg-[url(/pad.png)] hidden lg:block xl:hidden w-full h-full bg-cover" />
  <div class="absolute -z-20 bg-[url(/mobile.png)] hidden md:block lg:hidden w-full h-full bg-cover" />
  <div class="absolute -z-20 bg-[url(/small.png)] block md:hidden w-full h-full bg-cover" />
</div>

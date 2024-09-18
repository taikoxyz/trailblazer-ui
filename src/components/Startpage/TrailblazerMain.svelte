<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import ActionButton from '$components/Button/ActionButton.svelte';
  import { PlusIcon } from '$components/Icon';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import { web3modal } from '$libs/connect';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';

  const handlePrimaryAction = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };

  $: primaryButtonText = $account?.isConnected ? $t('buttons.get_started') : $t('buttons.connect_wallet');

  const wrapperClasses = classNames('w-full', 'flex', 'px-[48px]', 'h-[746px]');

  const backgroundImageClasses = classNames(
    'f-center',
    'md:f-left',
    'relative',
    'flex-col',
    'w-dvw',
    'rounded-[30px]',
    'overflow-hidden',
    'background-overlay',
    'bg-center',
    'xl:bg-[url(/splash/xl/splash.png)]',
    'lg:bg-[url(/splash/lg/splash.png)]',
    'md:bg-[url(/splash/md/splash.png)]',
    'bg-[url(/splash/sm/splash.png)]',

    'w-full',
    'h-full',
    'bg-cover',
    'px-[57px]',
  );
</script>

<div class={wrapperClasses}>
  <div class={backgroundImageClasses}>
    <div class="flex mb-[8px] flex-col xl:flex-row h-full justify-end items-end mb-8">
      <div class="flex-col w-full z-10">
        <!-- Title -->
        <div
          class="self-start font-clash-grotesk text-[23px]/[28px] tracking-[10px] xl:text-[45px]/[45px] xl:tracking-[22.5px] mb-[30px]">
          <div class="w-full flex-col gap-5">
            <TaikoTrailblazersLogo class="w-[335px] md:w-[471px] lg:w-[558px] rounded-[20px]" />
          </div>
        </div>
        <!-- Description -->
        <div class="flex-col f-left xl:self-start pb-6">
          <PlusIcon class="md:self-start block mb-6" />
          <div class="max-w-[262px] md:max-w-[343px] text-left lg:title-subsection-regular body-regular">
            Embark on the Trailblazers Journey: Unleash your potential in the Taiko universe!
          </div>
        </div>

        <div class="gap-4 self-center xl:self-start f-col md:f-row w-[150px]">
          <ActionButton priority="primary" on:click={handlePrimaryAction}>
            {primaryButtonText}
          </ActionButton>
        </div>
      </div>
    </div>
    <!-- Image -->
  </div>
</div>

<style>
  .background-overlay::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #0c111c;

    z-index: 0;
  }
</style>

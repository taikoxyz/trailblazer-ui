<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { web3modal } from '$lib/shared/utils/connect';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { account } from '$shared/stores/account';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  const handlePrimaryAction = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };

  $: primaryButtonText = $account?.isConnected ? $t('buttons.get_started') : $t('buttons.connect_wallet');

  const wrapperClasses = classNames(
    'w-full',
    'flex',
    'h-[746px]',
    'xl:max-w-[1344px]',
    'relative',
    'rounded-[30px]',
    'overflow-hidden',
  );

  const backgroundImageClasses = classNames(
    'absolute',
    'f-center',
    'md:f-left',
    'flex-col',
    'w-dvw',
    'rounded-[30px]',
    'overflow-hidden',
    'bg-center',
    'w-full',
    'h-full',
    'bg-cover',
    'px-[20px]',
  );

  const contentWrapperClasses = classNames('f-col', 'w-full', 'h-full', 'justify-end', 'items-end', 'mb-[30px]');
  const innerContentClasses = classNames(
    'f-col',
    'md:f-row',
    'w-full',
    'z-10',
    'bg-white',
    'rounded-[30px]',
    'md:rounded-full',
    'p-[30px]',
    'md:p-[8px]',
    'md:pl-[30px]',
    'md:gap-[20px]',
    'pr-[45px]',
    'items-center',
    'max-w-[728px]',
    'lg:self-start',
  );

  const descriptionWrapperClasses = classNames('flex-col', 'w-full', 'f-left', 'pb-6', 'md:pb-0');
  const descriptionTextClasses = classNames(
    'text-left',
    'font-clash-grotesk',
    'text-elevated-background',
    'text-[18px]',
    'font-medium',
    'leading-[20px]',
    'tracking-[0.09px]',
  );
  const buttonWrapperClasses = classNames('gap-4', 'self-start', 'f-col', 'md:f-row', 'w-[200px]');

  const pillClasses = classNames(
    'flex',
    'items-center',
    'pill-bg',
    'rounded-full',
    'p-[8px]',
    'pr-[16px]',
    'h-[72px]',
    'backdrop-blur-[2.5px]',
    'text-[18px]',
    'font-medium',
    'leading-[24px]',
    'tracking-[0.09px]',
    'mt-[24px]',
    'self-start',
  );
  const innerPillClasses = classNames('f-row', 'text-black', 'items-center', 'gap-[12px]');

  const seasonClasses = classNames(
    'bg-pink-50',
    'p-[16px]',
    'rounded-full',
    'gap-[10px]',
    'h-[56px]',
    'flex',
    'items-center',
  );
</script>

<div class={wrapperClasses}>
  {#if $activeSeason === 4}
    <img src="/splash/s4/evergreen.png" alt="splash" class="absolute w-full h-full object-cover" />
  {/if}
  {#if $activeSeason === 3}
    <video
      autoplay
      loop
      muted
      playsinline
      poster="/splash/fallback.webp"
      class="relative h-full object-cover"
      src="/splash/xl/evergreen.webm"></video>
  {/if}

  <div class={backgroundImageClasses}>
    {#if $activeSeason === 3}
      <div class={pillClasses}>
        <div class={innerPillClasses}>
          <div class={seasonClasses}>Season 3</div>
          Now live
        </div>
      </div>
    {/if}
    <div class={contentWrapperClasses}>
      <div class={innerContentClasses}>
        <div class={descriptionWrapperClasses}>
          <div class={descriptionTextClasses}>Embark on the Trailblazers Journey and unleash your potential!</div>
        </div>
        <div class={buttonWrapperClasses}>
          <ActionButton priority="primary" on:click={handlePrimaryAction} class="font-bold" withArrow>
            {primaryButtonText}
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .pill-bg {
    background-color: rgba(255, 198, 233, 0.7);
  }
  video {
    transition: opacity 0.3s ease;
  }
</style>

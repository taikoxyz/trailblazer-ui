<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { web3modal } from '$lib/shared/utils/connect';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { PlusIcon } from '$shared/components/Icon';
  import { TaikoTrailblazersLogo } from '$shared/components/Logo';
  import { account } from '$shared/stores/account';
  import { classNames } from '$shared/utils/classNames';

  const handlePrimaryAction = () => {
    $account.isConnected ? goto('/profile') : web3modal.open();
  };

  $: primaryButtonText = $account?.isConnected ? $t('buttons.get_started') : $t('buttons.connect_wallet');

  const wrapperClasses = classNames('w-full', 'flex', 'h-[746px]', 'xl:max-w-[1440px]');

  const backgroundImageClasses = classNames(
    'f-center',
    'md:f-left',
    'relative',
    'flex-col',
    'w-dvw',
    'rounded-[30px]',
    'overflow-hidden',
    'bg-center',
    'xl:bg-[url(/splash/xl/splash.png)]',
    'lg:bg-[url(/splash/lg/splash.png)]',
    'md:bg-[url(/splash/md/splash.png)]',
    'bg-[url(/splash/sm/splash.png)]',
    'w-full',
    'h-full',
    'bg-cover',
    'px-[57px]',
    'after:absolute',
    'after:top-0',
    'after:left-0',
    'after:w-full',
    'after:h-full',
    'after:opacity-50',
    'after:bg-[#0c111c]',
    'after:z-2',
  );

  const contentWrapperClasses = classNames(
    'flex',
    'flex-col',
    'xl:flex-row',
    'h-full',
    'justify-end',
    'items-end',
    'mb-12',
  );
  const innerContentClasses = classNames('flex-col', 'w-full', 'z-10');
  const titleClasses = classNames(
    'self-start',
    'font-clash-grotesk',
    'text-[23px]/[28px]',
    'tracking-[10px]',
    'xl:text-[45px]/[45px]',
    'xl:tracking-[22.5px]',
    'mb-[30px]',
  );
  const logoWrapperClasses = classNames('w-full', 'flex-col', 'gap-5');
  const logoClasses = classNames('w-[242px]', 'md:w-[395px]', 'rounded-[20px]');
  const descriptionWrapperClasses = classNames('flex-col', 'f-left', 'xl:self-start', 'pb-6');
  const plusIconClasses = classNames('md:self-start', 'block', 'mb-6');
  const descriptionTextClasses = classNames(
    'max-w-[262px]',
    'md:max-w-[343px]',
    'text-left',
    'lg:title-subsection-regular',
    'body-regular',
  );
  const buttonWrapperClasses = classNames('gap-4', 'self-center', 'xl:self-start', 'f-col', 'md:f-row', 'w-[150px]');
</script>

<div class={wrapperClasses}>
  <div class={backgroundImageClasses}>
    <div class={contentWrapperClasses}>
      <div class={innerContentClasses}>
        <div class={titleClasses}>
          <div class={logoWrapperClasses}>
            <TaikoTrailblazersLogo class={logoClasses} />
          </div>
        </div>
        <div class={descriptionWrapperClasses}>
          <PlusIcon class={plusIconClasses} />
          <div class={descriptionTextClasses}>
            Embark on the Trailblazers Journey: Unleash your potential in the Taiko universe!
          </div>
        </div>
        <div class={buttonWrapperClasses}>
          <ActionButton priority="primary" on:click={handlePrimaryAction}>
            {primaryButtonText}
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</div>

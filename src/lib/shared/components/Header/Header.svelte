<script lang="ts">
  import { ConnectButton } from '$shared/components/ConnectButton';
  import { TaikoTrailblazersLogo } from '$shared/components/Logo';
  import Logo from '$shared/components/Logo/Logo.svelte';
  import LogoWithText from '$shared/components/Logo/LogoWithText.svelte';
  import { MobileNavigation } from '$shared/components/Navigation/MobileNavigation';
  import Navigation from '$shared/components/Navigation/Navigation.svelte';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

  let isMenuOpen = false;
  export let ribbonActive = false;

  const wrapperClasses = classNames(
    'w-[100vw]',
    'md:px-[48px]',
    'relative',
    'justify-center',
    'flex',
    'z-30',
    'my-[30px]',
    'h-[56px]',
  );

  const containerClasses = classNames(
    'f-center',
    'w-full',
    'xl:max-w-[1344px]',
    'fixed',
    'px-[24px]',
    'md:px-[48px]',
    'xl:px-0',
  );

  const headerClasses = classNames(
    'flex',
    'body-regular',
    'items-center',
    'box-border',
    'lg:bg-none',
    'w-full',
    'justify-center',
  );

  const innerHeaderClasses = classNames(
    'f-between-center',
    'w-full',
    'gap-2',
    'min-h-[56px]',
    'xl:top-[12px]',
    'pl-[24px]',
    'bg-elevated-background',
    'rounded-full',
    'pr-[6px]',
  );

  const logoLinkClasses = classNames('flex', 'gap-2', 'items-end', 'z-10');
  const mobileLogoClasses = classNames('md:hidden');
  const desktopLogoClasses = classNames('hidden', 'md:flex', 'h-[25px]', 'w-[90px]');
  const trailblazersLogoClasses = classNames('max-w-[125px]', 'pb-[2px]', 'max-h-[25px]', 'min-h-[25px]');
</script>

{#if isDevelopmentEnv}
  <div class="f-col justify-center text-lg text-primary-brand items-center z-[100] fixed right-[50%] mt-[50px]">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Select season</span>
        <span class="label-text-alt">Active: {$activeSeason}</span>
      </div>
      <select class="select select-bordered w-full max-w-xs" bind:value={$activeSeason}>
        <option disabled selected>Select season</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </label>
  </div>
{/if}
<div class={wrapperClasses}>
  <div class={containerClasses}>
    <div class={headerClasses}>
      <div class={innerHeaderClasses}>
        <a class={logoLinkClasses} href="/">
          <Logo width={27} class={mobileLogoClasses} />
          <LogoWithText class={desktopLogoClasses} />
          <TaikoTrailblazersLogo class={trailblazersLogoClasses} />
        </a>

        <!-- Desktop Navigation -->
        <Navigation />
        <MobileNavigation bind:isMenuOpen {ribbonActive} />
        <div class="hidden xl:flex">
          <ConnectButton />
        </div>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import { ConnectButton } from '$components/ConnectButton';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import Logo from '$components/Logo/Logo.svelte';
  import LogoWithText from '$components/Logo/LogoWithText.svelte';
  import { MobileNavigation } from '$components/MobileNavigation';
  import Navigation from '$components/Navigation/Navigation.svelte';
  import { classNames } from '$libs/util/classNames';

  let mobileMenu = false;

  function toggleMobileMenu() {
    mobileMenu = !mobileMenu;
  }

  const wrapperClasses = classNames('h-[104px]', 'justify-center', 'flex', 'lg:top-[16px]', 'z-50', 'bg-[#0c0f1b]');

  const containerClasses = classNames(
    'f-center',
    'xl:container',
    'w-full',
    'fixed',
    'px-[24px]',

    'xl:relative',
    'lg:px-0',
    'bg-[#0c0f1b]',
    'z-50',
  );

  const headerClasses = classNames(
    'flex',
    'container',
    'lg:px-[48px]',
    'body-regular',
    'items-center',
    'box-border',
    'lg:bg-none',
    'z-[100]',
    'h-[104px]',
    'w-full',
    'justify-center',
  );

  const innerHeaderClasses = classNames('f-between-center', 'w-full', 'gap-2', 'xl:top-[12px]', 'pl-[8px]');

  const logoLinkClasses = classNames('flex', 'gap-2', 'items-end');
  const mobileLogoClasses = classNames('md:hidden');
  const desktopLogoClasses = classNames('hidden', 'md:flex', 'h-[25px]', 'w-[90px]');
  const trailblazersLogoClasses = classNames('max-w-[125px]', 'pb-[2px]', 'max-h-[25px]', 'min-h-[25px]');
  const burgerButtonClasses = classNames(
    'btn',
    'xl:hidden',
    'btn-circle',
    'bg-neutral-background',
    'border-none',
    'swap',
    'swap-rotate',

    'z-30',
  );

  );
  const desktopNavClasses = classNames('hidden', 'xl:flex');

</script>

<div class={wrapperClasses}>
  <div class={containerClasses}>
    <div class={headerClasses}>
      <div class={innerHeaderClasses}>
        <a class={logoLinkClasses} href="/">
          <Logo width={27} class={mobileLogoClasses} />
          <LogoWithText class={desktopLogoClasses} />
          <TaikoTrailblazersLogo class={trailblazersLogoClasses} />
        </a>

        <!-- Mobile Burger Button -->

        <label class={burgerButtonClasses}>
          <input type="checkbox" checked={mobileMenu} on:click={toggleMobileMenu} />
          <img src="/hamburger.svg" alt="menu closed" class="swap-off" />
          <img src="/x.svg" alt="menu open" class="swap-on" />
        </label>

        <!-- Desktop Navigation -->
        <Navigation />

        <div class="hidden xl:flex">

          <ConnectButton />
        </div>
      </div>
    </div>
  </div>
</div>

{#if mobileMenu}
  <MobileNavigation on:navigate={toggleMobileMenu} />
{/if}

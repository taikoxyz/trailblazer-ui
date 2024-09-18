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

  const wrapperClasses = classNames('w-full', 'f-center', 'z-10');
  const containerClasses = classNames('container', 'f-center', 'w-full', 'px-[20px]', 'lg:px-0');
  const headerClasses = classNames(
    'flex',
    'body-regular',
    'items-center',
    'justify-between',
    'box-border',
    'w-full',
    'rounded-full',
    'lg:bg-none',
  );
  const innerHeaderClasses = classNames(
    'f-between-center',
    'w-full',
    'gap-2',
    'relative',
    'md:px-[48px]',
    'px-[24px]',
    'py-[30px]',
  );
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

        <label class={burgerButtonClasses}>
          <input type="checkbox" checked={mobileMenu} on:click={toggleMobileMenu} />
          <img src="/hamburger.svg" alt="menu closed" class="swap-off" />
          <img src="/x.svg" alt="menu open" class="swap-on" />
        </label>

        <Navigation />
        <div class={desktopNavClasses}>
          <ConnectButton />
        </div>
      </div>
    </div>
  </div>
</div>

{#if mobileMenu}
  <MobileNavigation on:navigate={toggleMobileMenu} />
{/if}

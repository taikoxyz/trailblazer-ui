<script lang="ts">
  import { ConnectButton } from '$shared/components/ConnectButton';
  import { TaikoTrailblazersLogo } from '$shared/components/Logo';
  import Logo from '$shared/components/Logo/Logo.svelte';
  import LogoWithText from '$shared/components/Logo/LogoWithText.svelte';
  import { MobileNavigation } from '$shared/components/Navigation/MobileNavigation';
  import Navigation from '$shared/components/Navigation/Navigation.svelte';
  import { classNames } from '$shared/utils/classNames';

  let isMenuOpen = false;

  const wrapperClasses = classNames(
    'w-[100vw]',
    'px-[24px]',
    'md:px-[48px]',
    'h-[104px]',
    'relative',
    'justify-center',
    'flex',
    'bg-[#0c0f1b]',
  );

  const containerClasses = classNames('f-center', 'w-full', 'fixed', 'relative', 'bg-[#0c0f1b]', 'xl:max-w-[1440px]');

  const headerClasses = classNames(
    'flex',
    'body-regular',
    'items-center',
    'box-border',
    'lg:bg-none',

    'h-[104px]',
    'w-full',
    'justify-center',
  );

  const innerHeaderClasses = classNames('f-between-center', 'w-full', 'gap-2', 'xl:top-[12px]', 'pl-[8px]');

  const logoLinkClasses = classNames('flex', 'gap-2', 'items-end', 'z-10');
  const mobileLogoClasses = classNames('md:hidden');
  const desktopLogoClasses = classNames('hidden', 'md:flex', 'h-[25px]', 'w-[90px]');
  const trailblazersLogoClasses = classNames('max-w-[125px]', 'pb-[2px]', 'max-h-[25px]', 'min-h-[25px]');
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

        <!-- Desktop Navigation -->
        <Navigation />
        <MobileNavigation bind:isMenuOpen />
        <div class="hidden xl:flex">
          <ConnectButton />
        </div>
      </div>
    </div>
  </div>
</div>

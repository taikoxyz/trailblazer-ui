<script lang="ts">
  import { ConnectButton } from '$components/ConnectButton';
  import { TaikoTrailblazersLogo } from '$components/Logo';
  import Logo from '$components/Logo/Logo.svelte';
  import LogoWithText from '$components/Logo/LogoWithText.svelte';
  import { MobileNavigation } from '$components/MobileNavigation';
  import Navigation from '$components/Navigation/Navigation.svelte';

  let mobileMenu = false;

  function toggleMobileMenu() {
    mobileMenu = !mobileMenu;
  }
</script>

<div class="absolute w-full f-center lg:top-[16px] top-[-10px] z-50">
  <div class="container f-center w-full px-[20px] lg:px-0">
    <div class="flex body-regular items-center justify-between box-border w-full rounded-full lg:bg-none">
      <div
        class="f-between-center w-full gap-2 mt-[5px] relative top-[12px] xl:top-[12px] lg:top-[9px] md:top-[22px] lg:pl-[57px] md:pr-[20px] xl:pr-[57px] top-[22px] pl-[8px]">
        <a class="flex gap-2 items-end" href="/">
          <Logo width={27} class="md:hidden" />
          <LogoWithText class="hidden md:flex h-[25px] w-[90px]" />
          <TaikoTrailblazersLogo class="max-w-[125px] pb-[2px] max-h-[25px] min-h-[25px]" />
        </a>

        <!-- Mobile Burger Button -->
        <label class="btn xl:hidden btn-circle bg-neutral-background border-none swap swap-rotate z-30">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" checked={mobileMenu} on:click={toggleMobileMenu} />

          <img src="/hamburger.svg" alt="menu closed" class="swap-off" />
          <img src="/x.svg" alt="menu open" class="swap-on" />
        </label>

        <!--  Desktop Only -->
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

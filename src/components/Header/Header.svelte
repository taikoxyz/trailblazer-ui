<script lang="ts">
  import { ConnectButton } from '$components/ConnectButton';
  import { LogoWithText, TaikoTrailblazersLogo } from '$components/Logo';
  import { MobileNavigation } from '$components/MobileNavigation';

  import NavigationItem from './NavigationItem.svelte';

  let mobileMenu = false;

  function toggleMobileMenu() {
    mobileMenu = !mobileMenu;
  }
</script>

<div class="absolute w-full f-center top-0 z-50">
  <div class="container f-center w-full px-[20px] lg:px-[75px]">
    <div class="flex body-regular items-center justify-between box-border w-full mt-[30.75px] rounded-full lg:bg-none">
      <!-- Mobile Burger Button -->
      <button
        class="flex xl:hidden indicator btn bg-neutral-background border-none size-[50px] btn-circle fixed z-30 right-5"
        on:click={toggleMobileMenu}>
        <!-- <span class="indicator-item badge badge-xs {$account?.isConnected ? 'badge-primary' : 'badge-accent'}"></span> -->
        {#if !mobileMenu}
          <img src="/hamburger.svg" alt="menu" />
        {:else}
          <img src="/x.svg" alt="menu" />
        {/if}
      </button>
      <div class="f-center hidden lg:flex gap-2">
        <a class="f-center flex gap-2" href="/">
          <LogoWithText textFillClass="fill-primary-content" width={90} />
          <TaikoTrailblazersLogo class="w-[125px]" />
        </a>
      </div>
      <!--  Desktop Only -->
      <div class="hidden xl:flex gap-2">
        <div class="f-center gap-2">
          <NavigationItem navigation={{ name: 'Profile', route: '/profile' }}></NavigationItem>
          <NavigationItem
            navigation={{ name: 'Leaderboards', route: '/leaderboard/dapp' }}
            children={[
              { name: 'Bridge', route: '/leaderboard/bridge', icon: 'quad-circles' },
              { name: 'Dapp', route: '/leaderboard/dapp', icon: 'star2' },
              { name: 'DeFi', route: '/leaderboard/defi', icon: 'butterfly-cross' },
            ]}></NavigationItem>
          <NavigationItem
            navigation={{ name: 'Discover' }}
            children={[
              { name: 'About', route: '/about', icon: 'nav-about' },
              { name: 'Ecosystem', url: 'https://taiko.xyz/ecosystem', icon: 'nav-ecosystem' },
              { name: 'Bridge', url: 'https://bridge.taiko.xyz', icon: 'nav-bridge' },
            ]}></NavigationItem>
        </div>
      </div>
      <div class="hidden xl:flex">
        <ConnectButton />
      </div>
    </div>
  </div>
</div>
{#if mobileMenu}
  <MobileNavigation on:navigate={toggleMobileMenu} />
{/if}

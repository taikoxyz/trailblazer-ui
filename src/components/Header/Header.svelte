<script lang="ts">
  import { ConnectButton } from '$components/ConnectButton';
  import { LogoWithText, TaikoTrailblazersLogo } from '$components/Logo';
  import { MobileNavigation } from '$components/MobileNavigation';
  import HamburgerIcon from '$images/hamburger.svg';

  import XIcon from '$images/x.svg';
  import { account } from '$stores/account';
  import NavigationItem from './NavigationItem.svelte';

  let mobileMenu = false;

  function toggleMobileMenu() {
    console.log('toggleMobileMenu');
    mobileMenu = !mobileMenu;
  }
</script>

<div class="absolute w-full f-center top-0 z-50">
  <div class="container f-center w-full px-[20px] lg:px-[75px]">
    <div class=" flex body-regular items-center justify-between box-border w-full mt-8 py-2 rounded-full lg:bg-none">
      <!-- Mobile Burger Button -->
      <button
        class="flex lg:hidden indicator btn bg-elevated-background size-[50px] btn-circle fixed z-30 right-7"
        on:click={toggleMobileMenu}>
        <span class="indicator-item badge badge-xs {$account?.isConnected ? 'badge-primary' : 'badge-accent'}"></span>
        {#if !mobileMenu}
          <img src={HamburgerIcon} alt="menu" />
        {:else}
          <img src={XIcon} alt="menu" />
        {/if}
      </button>
      <div class="f-center hidden lg:flex gap-2">
        <a class="f-center flex gap-2" href="/">
          <LogoWithText textFillClass="fill-primary-content" width={90} />
          <TaikoTrailblazersLogo class="w-[125px]" />
        </a>
      </div>
      <!--  Desktop Only -->
      <div class="hidden lg:flex gap-2">
        <div class="flex gap-2">
          <NavigationItem navigation={{ name: 'Profile', url: '/profile' }}></NavigationItem>
          <NavigationItem
            navigation={{ name: 'Leaderboards', url: '/profile' }}
            children={[
              { name: 'User', url: '/users' },
              { name: 'Dapp', url: '/leaderboard' },
            ]}></NavigationItem>
          <NavigationItem navigation={{ name: 'Discover', url: 'https://taiko.xyz/ecosystem' }}></NavigationItem>
        </div>

        <ConnectButton />
      </div>
    </div>
  </div>
</div>
{#if mobileMenu}
  <MobileNavigation on:navigate={toggleMobileMenu} />
{/if}

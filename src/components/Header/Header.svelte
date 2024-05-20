<script lang="ts">
  // variables
  import { page } from '$app/stores';
  import ConnectButton from '$components/ConnectButton/ConnectButton.svelte';
  import { LogoWithText, TaikoTrailblazersLogo } from '$components/Logo';
  import { MobileNavigation } from '$components/MobileNavigation';
  import { ThemeButton } from '$components/ThemeButton';
  import { NavigationData } from '$configs/navigation';
  import HamburgerIcon from '$images/hamburger.svg';
  import TrailblazerTag from '$images/trailblazer-tag.svg';
  import TrailblazerLogo from '$images/taiko-trailblazer-logo.svg';
  import XIcon from '$images/x.svg';
  import { account } from '$stores/account';
  import { screen } from '$stores/responsiveness';

  let screenSize: number;
  let mobileMenu = false;

  function toggleMobileMenu() {
    console.log('toggleMobileMenu');
    mobileMenu = !mobileMenu;
  }
</script>

<svelte:window bind:innerWidth={screenSize} />

<div class="absolute w-full f-center px-8">
  <div class="container f-center w-full">
    <div class=" flex body-regular items-center justify-between box-border w-full mt-8 py-2 rounded-full lg:bg-none">
      {#if $screen == 'mobile'}
        <a href="/">
          <div class="flex justify-around items-center">
            <LogoWithText textFillClass="fill-primary-content" />
          </div>
        </a>
        <!-- Mobile Burger Button -->
        <button
          class="indicator btn bg-elevated-background size-[50px] btn-circle fixed z-30 right-7"
          on:click={toggleMobileMenu}>
          <span class="indicator-item badge badge-xs {$account?.isConnected ? 'badge-primary' : 'badge-accent'}"></span>
          {#if !mobileMenu}
            <img src={HamburgerIcon} alt="menu" />
          {:else}
            <img src={XIcon} alt="menu" />
          {/if}
        </button>
      {/if}
      {#if $screen == 'desktop'}
        <div class="f-center flex gap-2">
          <a class="f-center flex gap-2" href="/">
            <LogoWithText textFillClass="fill-primary-content" width={90} />
            <TaikoTrailblazersLogo class="w-[125px]" />
          </a>
        </div>

        <!-- Header Navigation -->

        <!-- <div class="lg:flex justify-center gap-[10px] body-bold"></div> -->
        
        <div class="hidden md:flex justify-end">
          <ConnectButton />
        </div>
      {/if}
    </div>
  </div>
</div>

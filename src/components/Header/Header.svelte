<script lang="ts">
  // variables
  import HamburgerIcon from '$images/hamburger.svg';
  import XIcon from '$images/x.svg';
  import { screen } from '$stores/responsiveness';
  import { MobileNavigation } from '$components/MobileNavigation';
  import { account } from '$stores/account';
  import { ThemeButton } from '$components/ThemeButton';
  import { LogoWithText } from '$components/Logo';
  import { NavigationData } from '$configs/navigation';
  import { page } from '$app/stores';
  import ConnectButton from '$components/ConnectButton/ConnectButton.svelte';

  let screenSize: number;
  let mobileMenu = false;

  function toggleMobileMenu() {
    console.log('toggleMobileMenu');
    mobileMenu = !mobileMenu;
  }
</script>

<svelte:window bind:innerWidth={screenSize} />

<div class="absolute w-full f-center">
  <div class="max-w-section f-center w-full">
    <div
      class="container flex body-regular items-center justify-between box-border w-full mt-8 py-2 rounded-full lg:bg-none">
      {#if $screen == 'mobile'}
        <a href="/">
          <div class="flex justify-around items-center">
            <LogoWithText textFillClass="fill-primary-content" width={77} />
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
        <a href="/">
          <LogoWithText textFillClass="fill-primary-content" width={77} />
        </a>
        <!-- Header Navigation -->

        <div class="lg:flex justify-center gap-[10px] body-bold">
          {#each NavigationData as data}
            <a
              class={`bg-neutral-background py-3 px-5 w-full max-w-[140px] text-center rounded-full hover:text-[#CD0682] ${$page.url.pathname === data.url ? 'active-tab' : ''} nav-item ${data.disabled ? 'disabled-tag' : ''}`}
              href={data.disabled ? '#' : data.url}
              >{data.label}
            </a>
          {/each}
        </div>

        <div class="hidden md:flex justify-end">
          <ConnectButton />
          <div class="v-sep my-auto mx-[8px] h-[24px]" />
          <ThemeButton />
        </div>
      {/if}
      {#if mobileMenu}
        <MobileNavigation />
      {/if}
    </div>
  </div>
</div>

<script lang="ts">
  // variables
  import Logo from '$images/taiko-h-wht.svg';
  import HamburgerIcon from '$images/hamburger.svg';
  import XIcon from '$images/x.svg';
  import StarIcon from '$images/star.svg';
  import HourglassIcon from '$images/hourglass.svg';
  import { screen } from '$stores/responsiveness';
  import { MobileNavigation } from '$components/MobileNavigation';
  import ConnectWalletButton from '$components/Button/ConnectWalletButton.svelte';
  import { account } from '$stores/account';
  import { ThemeButton } from '$components/ThemeButton';
  import { Icon } from '$components/Icon';
  import { LogoWithText } from '$components/Logo';
  import { NavigationData } from '$configs/navigation';
  import { page } from '$app/stores';

  let screenSize: number;
  let mobileMenu = false;

  function toggleMobileMenu() {
    console.log('toggleMobileMenu');
    mobileMenu = !mobileMenu;
  }
</script>

<svelte:window bind:innerWidth={screenSize} />

<div
  class="flex body-regular justify-between items-center box-border mx-auto w-full max-w-[1440px] mt-8 py-2 pl-6 pr-2 rounded-full lg:bg-container">
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

    <div class="lg:flex items-start justify-center gap-10 body-bold">
      {#each NavigationData as data}
        <header-item>
          <a
            class={`hover:text-[#CD0682] ${$page.url.pathname === data.url ? 'active-tab' : ''} nav-item ${data.disabled ? 'disabled-tag' : ''}`}
            href={data.disabled ? '#' : data.url}
            >{data.label}
          </a>
        </header-item>
      {/each}
    </div>

    <div class="hidden md:inline-flex">
      <ConnectWalletButton />
      <div class="v-sep my-auto mx-[8px] h-[24px]" />
      <ThemeButton />
    </div>
  {/if}
  {#if mobileMenu}
    <MobileNavigation />
  {/if}
</div>

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
        <img src={Logo} alt="logo" />
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
      <img src={Logo} alt="logo" class="w-[90px] h-[24.5px]" />
    </a>
    <div class="flex items-center justify-center gap-14 h-9 text-primary-content body-regular">
      <div class="dropdown dropdown-hover dropdown-bottom bg-transparent">
        <a href="/">
          <div tabindex="0" role="button">Airdrop +</div>
        </a>
        <ul
          class="dropdown-content bg-gradient-background backdrop-blur opacity-50 z-[1] menu p-2 shadow rounded-box w-52 body-regular">
          <li>
            <a href="/claim" class="flex items-center gap-4"
              ><img src={StarIcon} alt="icon" class="size-4" />Claim Token</a>
          </li>
          <li>
            <a href="/bind" class="flex items-center gap-4"
              ><img src={HourglassIcon} alt="icon" class="size-4" />Bind Account</a>
          </li>
        </ul>
      </div>

      <div>
        <div>Trailblazer +</div>
      </div>

      <div>
        <div class="text-tertiary-content">Leaderboard</div>
      </div>
    </div>
    <ConnectWalletButton />
  {/if}
  {#if mobileMenu}
    <MobileNavigation />
  {/if}
</div>

<script lang="ts">
  import { ConnectButton } from '$components/ConnectButton';
  import { LogoWithText, TaikoTrailblazersLogo } from '$components/Logo';
  import HamburgerIcon from '$images/hamburger.svg';

  import XIcon from '$images/x.svg';
  import { account } from '$stores/account';

  let mobileMenu = false;

  function toggleMobileMenu() {
    console.log('toggleMobileMenu');
    mobileMenu = !mobileMenu;
  }
</script>

<div class="absolute w-full f-center top-0">
  <div class="container f-center w-full px-[75px]">
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
      <div class="hidden lg:flex justify-end">
        <ConnectButton />
      </div>
    </div>
  </div>
</div>

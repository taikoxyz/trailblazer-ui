<script>
  import { fly } from 'svelte/transition';

  import ConnectWalletButton from '$components/Button/ConnectWalletButton.svelte';
  import HourglassIcon from '$images/hourglass.svg';
  import StarIcon from '$images/star.svg';
  import TaikoLogo from '$images/taiko-h-wht.svg';
</script>

<!-- Overlay -->
<div class="z-20 fixed top-0 left-0 h-full w-full bg-elevated-background" transition:fly={{ x: '600' }}>
  <div class="z-21 flex flex-col gap-2 p-7">
    <img src={TaikoLogo} alt="logo" class="w-[90px] pb-14" />
    <div class="body-regular text-secondary-content">MENU</div>

    <!-- wallet -->

    <ConnectWalletButton />
    <!-- Links -->

    <div class="flex flex-col w-full gap-2">
      <div class="collapse collapse-plus bg-neutral w-full rounded-box px-4">
        <input type="radio" name="my-accordion-3" checked />
        <div class="collapse-title title-subsection-bold">Airdrop</div>
        <div class="collapse-content bg-neutral w-full rounded-box flex flex-col gap-4">
          <a href="/" class="flex items-center gap-4"><img src={StarIcon} alt="icon" class="size-4" />Home</a>
          <a href="/claim" class="flex items-center gap-4"
            ><img src={StarIcon} alt="icon" class="size-4" />Claim Token</a>
          <a href="/bind" class="flex items-center gap-4"
            ><img src={HourglassIcon} alt="icon" class="size-4" />Bind Account</a>
        </div>
      </div>
      <div class="collapse collapse-plus bg-neutral w-full rounded-box px-4">
        <input type="radio" name="my-accordion-3" />
        <div class="collapse-title title-subsection-bold">Ecosystem</div>
        <div class="collapse-content bg-neutral w-full rounded-box flex flex-col gap-4">
          <a href="/" class="flex items-center gap-4"><img src={StarIcon} alt="icon" class="size-4" />Home</a>
          <a href="/claim" class="flex items-center gap-4"
            ><img src={StarIcon} alt="icon" class="size-4" />Claim Token</a>
          <a href="/bind" class="flex items-center gap-4"
            ><img src={HourglassIcon} alt="icon" class="size-4" />Bind Account</a>
        </div>
      </div>
      <div class="collapse collapse-plus bg-neutral w-full rounded-box px-4">
        <input type="radio" name="my-accordion-1" />
        <div class="collapse-title title-subsection-bold text-tertiary-content">
          Leaderboard <span class="body-small-regular">(coming soon)</span>
        </div>
      </div>
    </div>
  </div>
</div>

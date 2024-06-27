<script>
  import { fly } from 'svelte/transition';

  import ConnectButton from '$components/ConnectButton/ConnectButton.svelte';

  import MobileNavigationLink from './MobileNavigationLink.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<!-- Overlay -->
<div class="z-20 fixed top-0 left-0 h-full w-full bg-elevated-background" transition:fly={{ x: '600' }}>
  <div class="z-21 flex flex-col gap-2 p-7">
    <a class="flex gap-2 pb-14" href="/"> </a>
    <div class="body-regular text-secondary-content">MENU</div>

    <!-- wallet -->

    <ConnectButton />
    <!-- Links -->

    <div class="flex flex-col w-full gap-2">
      <button
        class="bg-neutral w-full rounded-box p-[24px] hover:cursor-pointer text-start"
        on:click={() => dispatch('navigate', { url: '/profile' })}>
        <a href="/profile" class="font-clash-grotesk title-subsection-medium text-[22px]">Profile</a>
      </button>
    </div>
    <div class="collapse collapse-plus bg-neutral w-full rounded-box px-4">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title font-clash-grotesk title-subsection-medium text-[22px]">Leaderboard</div>
      <div class="collapse-content bg-neutral w-full rounded-box flex flex-col gap-4">
        <MobileNavigationLink on:navigate url="/leaderboard/bridge" label="Bridge" icon="quad-circles" />
        <MobileNavigationLink on:navigate url="/leaderboard/dapp" label="Dapp" icon="star2" />
      </div>
    </div>
    <div class="collapse collapse-plus bg-neutral w-full rounded-box px-4">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title font-clash-grotesk title-subsection-medium text-[22px]">Discover</div>
      <div class="collapse-content bg-neutral w-full rounded-box flex flex-col gap-4">
        <MobileNavigationLink on:navigate url="/about" label="About" icon="nav-about" />
        <MobileNavigationLink on:navigate url="https://taiko.xyz/ecosystem" label="Ecosystem" icon="nav-ecosystem" />
        <MobileNavigationLink on:navigate url="https://bridge.taiko.xyz" label="Bridge" icon="nav-bridge" />
      </div>
    </div>
  </div>
</div>

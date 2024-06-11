<script>
  import { fly } from 'svelte/transition';

  import ConnectButton from '$components/ConnectButton/ConnectButton.svelte';

  import MobileNavigationLink from './MobileNavigationLink.svelte';
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
      <div class="collapse collapse-plus bg-neutral w-full rounded-box px-4">
        <input type="radio" name="my-accordion-3" checked />
        <div class="collapse-title title-subsection-bold">Trailblazers</div>
        <div class="collapse-content bg-neutral w-full rounded-box flex flex-col gap-4">
          <MobileNavigationLink on:navigate url="/" label="Home" />
          <MobileNavigationLink on:navigate url="/profile" label="Profile" />
          <MobileNavigationLink on:navigate url="/leaderboard" label="Leaderboard" />
        </div>
      </div>
    </div>
  </div>
</div>

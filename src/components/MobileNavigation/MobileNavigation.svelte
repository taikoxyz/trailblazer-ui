<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  import ConnectButton from '$components/ConnectButton/ConnectButton.svelte';

  import MobileNavigationLink from './MobileNavigationLink.svelte';

  const dispatch = createEventDispatcher();

  const handleClick1 = () => {
    menu1Checked = !menu1Checked;
  };

  const handleClick2 = () => {
    menu2Checked = !menu2Checked;
  };

  let menu1Checked = false;
  let menu2Checked = false;
</script>

<!-- Overlay -->
<div class="z-20 fixed top-0 left-0 h-full w-full bg-elevated-background" transition:fly={{ x: '600' }}>
  <div class="z-21 flex flex-col gap-2 p-5">
    <a class="flex gap-2 pb-20" href="/"> </a>

    <!-- wallet -->
    <ConnectButton class="min-h-[75px] min-w-full" />
    <!-- Links -->

    <div class="flex flex-col w-full gap-2">
      <button
        class="bg-neutral w-full rounded-full p-[24px] hover:cursor-pointer text-start h-[75px]"
        on:click={() => dispatch('navigate', { url: '/profile' })}>
        <a href="/profile" class="font-clash-grotesk title-subsection-medium text-[22px]/[24px]">Profile</a>
      </button>
    </div>
    <div
      class="collapse collapse-plus bg-neutral w-full {menu1Checked
        ? 'rounded-[30px]'
        : 'rounded-full'} pl-6 py-2 min-h-[75px]">
      <input type="checkbox" checked={menu1Checked} on:click={handleClick1} />
      <div class="collapse-title flex items-center w-full p-0 font-clash-grotesk title-subsection-medium text-[22px]">
        Leaderboard
      </div>
      <div class="collapse-content bg-neutral w-full rounded-full flex flex-col gap-4 pl-0">
        <MobileNavigationLink on:navigate url="/leaderboard/gaming" label="Gaming" icon="quad-circles" />
        <MobileNavigationLink on:navigate url="/leaderboard/dapp" label="Dapp" icon="star2" />
        <MobileNavigationLink on:navigate url="/leaderboard/defi" label="DeFi" icon="butterfly-cross" />
      </div>
    </div>
    <div
      class="collapse collapse-plus bg-neutral w-full {menu2Checked
        ? 'rounded-[30px]'
        : 'rounded-full'} pl-6 py-2 min-h-[75px]">
      <input type="checkbox" checked={menu2Checked} on:click={handleClick2} />
      <div class="collapse-title flex items-center w-full p-0 font-clash-grotesk title-subsection-medium text-[22px]">
        Discover
      </div>
      <div class="collapse-content bg-neutral w-full rounded-full flex flex-col gap-4 pl-0">
        <MobileNavigationLink on:navigate url="/about" label="About" icon="nav-about" />
        <MobileNavigationLink on:navigate url="https://taiko.xyz/ecosystem" label="Ecosystem" icon="nav-ecosystem" />
        <MobileNavigationLink on:navigate url="https://bridge.taiko.xyz" label="Bridge" icon="nav-bridge" />
      </div>
    </div>

    <div class="flex flex-col w-full gap-2">
      <button
        class="bg-neutral w-full rounded-full p-[24px] hover:cursor-pointer text-start h-[75px]"
        on:click={() => dispatch('navigate', { url: '/faq' })}>
        <a href="/faq" class="font-clash-grotesk title-subsection-medium text-[22px]/[24px]">FAQs</a>
      </button>
    </div>
  </div>
</div>

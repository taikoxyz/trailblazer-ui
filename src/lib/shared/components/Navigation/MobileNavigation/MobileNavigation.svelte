<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';

  import ConnectButton from '$shared/components/ConnectButton/ConnectButton.svelte';
  import { Logo, TaikoTrailblazersLogo } from '$shared/components/Logo';
  import { classNames } from '$shared/utils/classNames';
  import { routes } from '$shared/utils/routes/routes';

  import MobileNavigationLink from './MobileNavigationLink.svelte';

  const dispatch = createEventDispatcher();

  export let isMenuOpen: boolean;

  function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
  }

  let expandedMenus: { [key: string]: boolean } = {};

  function toggleMenu(menuName: string) {
    expandedMenus[menuName] = !expandedMenus[menuName];
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  const burgerButtonClasses = classNames(
    'btn',
    'xl:hidden',
    'btn-circle',
    'bg-neutral-background',
    'hover:bg-secondary-interactive-hover',
    'border-none',
    'swap',
    'swap-rotate',
  );

  // Prevent background scrolling when the menu is open
  let originalOverflow: string;

  const logoLinkClasses = classNames('flex', 'gap-2', 'items-end', 'z-10');
  const trailblazersLogoClasses = classNames('max-w-[125px]', 'pb-[2px]', 'max-h-[25px]', 'min-h-[25px]');

  $: {
    if (isMenuOpen) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (originalOverflow !== undefined) {
      document.body.style.overflow = originalOverflow;
    }
  }

  onDestroy(() => {
    if (originalOverflow !== undefined) {
      document.body.style.overflow = originalOverflow;
    }
  });
</script>

<!-- Mobile Menu Toggle Button -->
<label class={burgerButtonClasses}>
  <input type="checkbox" checked={isMenuOpen} on:click={toggleMobileMenu} />
  <img src="/hamburger.svg" alt="menu closed" class="swap-off pl-[2px]" />
  <img src="/x.svg" alt="menu open" class="swap-on pl-[1px]" />
</label>

{#if isMenuOpen}
  <!-- Overlay -->
  <div class="z-30 fixed inset-0 overflow-y-scroll h-full w-full" transition:fly={{ x: '600' }}>
    <div class="relative z-21 flex flex-col gap-2 p-5 pt-[78px] min-h-full bg-elevated-background">
      <div class="f-between-center mb-10">
        <a class={logoLinkClasses} href="/">
          <Logo width={27} class="" /> <TaikoTrailblazersLogo class={trailblazersLogoClasses} /></a>

        <label class={burgerButtonClasses}>
          <input type="checkbox" checked={isMenuOpen} on:click={toggleMobileMenu} />
          <img src="/hamburger.svg" alt="menu closed" class="swap-off pl-[2px]" />
          <img src="/x.svg" alt="menu open" class="swap-on pl-[1px]" />
        </label>
      </div>
      <!-- Wallet -->
      <ConnectButton class="min-h-[75px] min-w-full" />

      <!-- Navigation Links -->
      <div class="flex flex-col w-full gap-2">
        {#each routes as route}
          {#if route.children}
            <div
              class="collapse collapse-plus bg-neutral w-full {expandedMenus[route.name]
                ? 'rounded-[30px]'
                : 'rounded-full'} pl-6 py-2 min-h-[75px]">
              <input type="checkbox" checked={expandedMenus[route.name]} on:click={() => toggleMenu(route.name)} />
              <div
                class="collapse-title flex items-center w-full p-0 font-clash-grotesk title-subsection-medium text-[22px]">
                {route.name}
              </div>
              <div class="collapse-content bg-neutral w-full rounded-full flex flex-col gap-4 pl-0">
                {#each route.children as child}
                  <MobileNavigationLink navigation={child} on:navigate={closeMenu} />
                {/each}
              </div>
            </div>
          {:else}
            <button
              class="bg-neutral w-full rounded-full p-[24px] text-start h-[75px]"
              on:click={() => {
                // Navigate to the route
                closeMenu();
                dispatch('navigate', { url: route.route });
              }}>
              <a href={route.route} class="font-clash-grotesk title-subsection-medium text-[22px]/[24px]">
                {route.name}
              </a>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}

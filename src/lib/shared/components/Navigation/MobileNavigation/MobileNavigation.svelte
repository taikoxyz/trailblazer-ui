<script lang="ts">
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';

  import { goto } from '$app/navigation';
  import ConnectButton from '$shared/components/ConnectButton/ConnectButton.svelte';
  import { routes } from '$shared/routes/';
  import { classNames } from '$shared/utils/classNames';

  import MobileNavigationLink from './MobileNavigationLink.svelte';

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
    'mr-[6px]',
    'border-none',
    'swap',
    'swap-rotate',
  );

  // Prevent background scrolling when the menu is open
  let originalOverflow: string;

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
  <div class="z-30 fixed top-[100px] left-0 overflow-y-scroll h-full w-full" transition:fly={{ x: '600' }}>
    <div class="relative z-21 flex flex-col gap-2 px-[24px] md:px-[48px] min-h-full bg-primary-background">
      <!-- Wallet -->
      <ConnectButton class="min-h-[75px] min-w-full" />

      <!-- Navigation Links -->
      <div class="flex flex-col w-full gap-2">
        {#each routes as route}
          {@const { flamboyant } = route}
          {#if route.children}
            <div
              class="collapse collapse-arrow bg-elevated-background w-full {expandedMenus[route.name]
                ? 'rounded-[30px]'
                : 'rounded-full'} pl-6 py-2 min-h-[75px]">
              <input type="checkbox" checked={expandedMenus[route.name]} on:click={() => toggleMenu(route.name)} />
              <div
                class="collapse-title flex items-center w-full p-0 font-clash-grotesk title-subsection-medium text-[22px] {flamboyant
                  ? 'gradient-text'
                  : ''}">
                {route.name}
              </div>
              <div class="collapse-content bg-elevated-background w-full rounded-full flex flex-col gap-4 pl-0">
                {#each route.children as child}
                  <MobileNavigationLink navigation={child} on:navigate={closeMenu} />
                {/each}
              </div>
            </div>
          {:else}
            <button
              class="bg-elevated-background w-full rounded-full p-[24px] text-start h-[75px]"
              on:click={() => {
                // Navigate to the route
                closeMenu();
                if (route.route) goto(route.route);
              }}>
              <a
                href={route.route}
                class="font-clash-grotesk title-subsection-medium text-[22px]/[24px] {flamboyant
                  ? 'gradient-text'
                  : ''}">
                {route.name}
              </a>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .gradient-text {
    background: linear-gradient(84deg, #ffc6e9 -33.76%, #e81899 77.6%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
</style>

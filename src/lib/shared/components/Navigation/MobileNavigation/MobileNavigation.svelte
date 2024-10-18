<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  import ConnectButton from '$shared/components/ConnectButton/ConnectButton.svelte';
  import { routes } from '$shared/utils/routes/routes';

  import MobileNavigationLink from './MobileNavigationLink.svelte';

  const dispatch = createEventDispatcher();

  let expandedMenus: { [key: string]: boolean } = {};

  const toggleMenu = (menuName: string) => {
    expandedMenus[menuName] = !expandedMenus[menuName];
  };
</script>

<!-- Overlay -->
<div class="z-30 fixed top-0 left-0 h-full w-full" transition:fly={{ x: '600' }}>
  <div class="z-21 flex flex-col gap-2 p-5 pt-[48px] h-full bg-elevated-background">
    <a class="flex gap-2 pb-20" href="/"> </a>

    <!-- wallet -->
    <ConnectButton class="min-h-[75px] min-w-full" />

    <!-- Links -->
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
                <MobileNavigationLink on:navigate navigation={child} />
              {/each}
            </div>
          </div>
        {:else}
          <button
            class="bg-neutral w-full rounded-full p-[24px] hover:cursor-pointer text-start h-[75px]"
            on:click={() => dispatch('navigate', { url: route.route })}>
            <a href={route.route} class="font-clash-grotesk title-subsection-medium text-[22px]/[24px]">{route.name}</a>
          </button>
        {/if}
      {/each}
    </div>
  </div>
</div>

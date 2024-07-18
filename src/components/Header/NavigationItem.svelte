<script lang="ts">
  import { derived } from 'svelte/store';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '$components/Icon/Icon.svelte';

  import type { NavigationData } from './types';

  export let children: NavigationData[] = [];
  export let navigation: NavigationData = {
    name: '',
    url: '/',
    route: '',
  };

  const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

{#if children.length > 0}
  <div class="dropdown dropdown-hover dropdown-bottom rounded-full lg:bg-container">
    {#if navigation.url}
      <a
        class="btn btn-ghost text-base hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center min-w-[140px]"
        href={navigation.url}>
        <div tabindex="0" role="button">{navigation.name} +</div>
      </a>
    {:else}
      <button
        class="btn btn-ghost text-base hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center mb-2 min-w-[140px]"
        tabindex="0">
        {navigation.name} +
      </button>
    {/if}

    <ul
      class="dropdown-content flex flex-col items-start py-[24px] pl-[24px] pr-[43px] gap-[22px] bg-neutral-background opacity-100 z-[1] shadow rounded-box w-fit body-regular">
      {#each children as child}
        <li>
          {#if child.url}
            <div class="f-center items-center gap-4 hover:cursor-pointer hover:text-primary-brand">
              {#if child.icon}
                <Icon size={15} type={child.icon} />
              {/if}
              <a href={child.url} class:text-primary-brand={$currentPath === child.url} class="flex items-center gap-4"
                >{child.name}</a>
            </div>
          {:else if child.route}
            <button
              on:click={() => goto(child.route || '')}
              class:text-primary-brand={$currentPath === child.route}
              class="flex items-center gap-4 hover:cursor-pointer hover:text-primary-brand">
              {#if child.icon}
                <Icon size={15} type={child.icon} />
              {/if}
              {child.name}
            </button>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{:else if navigation.url}
  <a href={navigation.url} target="_blank">
    <div
      class:text-primary-brand={$currentPath === navigation.url}
      class="btn btn-ghost text-base hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center">
      {navigation.name}
      <div class="flex flex-grow justify-end">
        <Icon type="arrow-top-right" class="justify-self-end" />
      </div>
    </div>
  </a>
{:else}
  <button
    on:click={() => goto(navigation.route || '')}
    class:text-primary-brand={$currentPath.startsWith(navigation.route || '')}
    class="btn btn-ghost text-base min-w-[140px] hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center mb-2">
    {navigation.name}
  </button>
{/if}

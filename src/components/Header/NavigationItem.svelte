<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '$components/Icon/Icon.svelte';

  import type { NavigationData } from './types';

  export let children: NavigationData[] = [];
  export let navigation: NavigationData = {
    name: '',
    url: '/',
    route: '',
  };
</script>

{#if Object.keys(children).length > 0}
  <div class="dropdown dropdown-hover dropdown-bottom rounded-full lg:bg-container">
    {#if navigation.url}
      <a
        class="hover:cursor-pointer rounded-full lg:bg-neutral-background lg:hover:bg-elevated-background px-[20px] py-[12px] f-center"
        href={navigation.url}>
        <div tabindex="0" role="button">{navigation.name} +</div>
      </a>
    {:else}
      <button
        class="hover:cursor-pointer rounded-full lg:bg-neutral-background lg:hover:bg-elevated-background px-[20px] py-[12px] f-center"
        tabindex="0">
        {navigation.name} +
      </button>
    {/if}
    <ul
      class="dropdown-delay dropdown-content bg-overlay-background opacity-100 -left-1/3 z-[1] menu p-4 mt-2 shadow rounded-box w-52 body-regular">
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each Object.entries(children) as [key, value]}
        <li>
          {#if value.url}
            <a href={value.url} class="flex items-center gap-4">{value.name}</a>
          {:else if value.route !== undefined}
            {@const route = value.route || ''}
            <button on:click={() => goto(route)} class="flex items-center gap-4 hover:cursor-pointer">
              {value.name}
            </button>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{:else if navigation.url}
  <a href={navigation.url} target="_blank">
    <div
      class="hover:cursor-pointer rounded-full lg:bg-neutral-background lg:hover:bg-elevated-background px-[20px] py-[12px] f-center">
      {navigation.name}
      <div class="flex flex-grow justify-end">
        <Icon type="arrow-top-right" class="justify-self-end" />
      </div>
    </div>
  </a>
{:else}
  {@const route = navigation.route || ''}
  <button
    on:click={() => goto(route)}
    class="hover:cursor-pointer rounded-full lg:bg-neutral-background lg:hover:bg-elevated-background px-[20px] py-[12px] f-center">
    {navigation.name}
  </button>
{/if}

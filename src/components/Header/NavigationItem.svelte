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
    <!-- Check if parent has a URL -->
    {#if navigation.url}
      <a
        class="hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center min-w-[140px]"
        href={navigation.url}>
        <div tabindex="0" role="button">{navigation.name} +</div>
      </a>
    {:else}
      <button
        class="hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center mb-2 min-w-[140px]"
        tabindex="0">
        {navigation.name} +
      </button>
    {/if}
    <ul
      class="dropdown-content flex flex-col items-center p-[24px] gap-[22px] bg-neutral-background opacity-100 z-[1] shadow rounded-box w-fit body-regular">
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each Object.entries(children) as [key, value]}
        <li>
          {#if value.url}
            <div class="flex items-center gap-4 hover:cursor-pointer">
              {#if value.icon}
                <Icon type={value.icon} />
              {/if}
              <a href={value.url} class="flex items-center gap-4">{value.name}</a>
            </div>
          {:else if value.route !== undefined}
            {@const route = value.route || ''}
            <button on:click={() => goto(route)} class="flex items-center gap-4 hover:cursor-pointer">
              {#if value.icon}
                <Icon type={value.icon} />
              {/if}
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
      class="hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center">
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
    class="min-w-[140px] hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center">
    {navigation.name}
  </button>
{/if}

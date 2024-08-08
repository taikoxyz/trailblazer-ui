<script lang="ts">
  import { derived } from 'svelte/store';

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Icon } from '$components/Icon';
  import type { NavigationItem } from '$libs/routes';

  export let navigation: NavigationItem;
  $: currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<!--  Desktop Only -->
{#if navigation.route}
  <div class="f-center items-center gap-4 hover:cursor-pointer hover:text-primary-brand">
    {#if navigation.icon}
      <Icon size={15} type={navigation.icon} />
    {/if}
    <a
      href={navigation.route}
      class:text-primary-brand={$currentPath === navigation.route}
      class="flex items-center gap-4">{navigation.name}</a>
  </div>
{:else if navigation.route}
  <button
    on:click={() => goto(navigation.route || '')}
    class:text-primary-brand={$currentPath === navigation.route}
    class="flex items-center gap-4 hover:cursor-pointer hover:text-primary-brand">
    {#if navigation.icon}
      <Icon size={15} type={navigation.icon} />
    {/if}
    {navigation.name}
  </button>
{/if}

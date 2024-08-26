<script lang="ts">
  import { derived } from 'svelte/store';

  import { page } from '$app/stores';
  import { Icon } from '$components/Icon';
  import type { NavigationItem } from '$libs/routes';

  export let navigation: NavigationItem;
  $: currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<!--  Desktop Only -->
<div class="f-center items-center gap-4 hover:cursor-pointer hover:text-primary-brand">
  {#if navigation.icon}
    <Icon size={15} type={navigation.icon} />
  {/if}
  <a
    href={navigation.route}
    class:text-primary-brand={$currentPath === navigation.route}
    class="flex items-center gap-4">{navigation.name}</a>
</div>

<script lang="ts">
  import { derived } from 'svelte/store';

  import { page } from '$app/stores';
  import type { NavigationItem } from '$shared/utils/routes';

  export let navigation: NavigationItem;
  let children: NavigationItem[] = navigation.children || [];

  const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<div class="dropdown dropdown-hover dropdown-bottom rounded-full lg:bg-container">
  {#if navigation.route}
    <a
      class:text-primary-brand={$currentPath.split('/').includes(navigation.route.split('/')[1])}
      class="btn btn-ghost text-base hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center min-w-[140px] mb-2"
      href={navigation.route}>
      <div tabindex="0" role="button">{navigation.name} {children.length > 0 ? '+' : ''}</div>
    </a>
  {:else}
    <button
      class="btn btn-ghost text-base hover:cursor-pointer rounded-full h-fit lg:bg-neutral-background lg:hover:bg-elevated-background py-[12px] f-center min-w-[140px] mb-2"
      tabindex="0">
      {navigation.name}
      {children.length > 0 ? '+' : ''}
    </button>
  {/if}

  {#if children.length > 0 && children}
    <ul
      class="dropdown-content flex flex-col items-start py-[24px] pl-[24px] pr-[43px] gap-[22px] bg-neutral-background opacity-100 z-[1] shadow rounded-box w-fit body-regular">
      <slot></slot>
    </ul>
  {/if}
</div>

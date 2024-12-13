<script lang="ts">
  import { derived } from 'svelte/store';

  import { page } from '$app/stores';
  import { classNames } from '$shared/utils/classNames';
  import type { NavigationItem } from '$shared/utils/routes';

  import Icon from '../Icon/Icon.svelte';

  export let navigation: NavigationItem;
  let children: NavigationItem[] = navigation.children || [];

  const { flamboyant } = navigation;

  const currentPath = derived(page, ($page) => $page.url.pathname);
  const buttonClasses = classNames(
    'btn',
    'btn-sm',
    'btn-ghost',
    'text-base',
    'leading-none',
    'hover:cursor-pointer',
    'h-[44px]',
    'rounded-full',
    'lg:hover:bg-neutral-background',
    'py-[12px]',
    'f-center',
    'group',
  );

  // Dropdown visibility state
  let isOpen = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    isOpen = true;
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      isOpen = false;
    }, 200);
  };
</script>

<div
  role="navigation"
  class="dropdown relative rounded-full z-20 text-secondary-content f-center {$$props.class}"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}>
  {#if navigation.route}
    <a
      class:text-primary-brand={$currentPath.split('/').includes(navigation.route.split('/')[1])}
      class={buttonClasses}
      href={navigation.route}>
      <div tabindex="0" role="button">
        <span class={flamboyant ? 'gradient-text' : ''}>{navigation.name}</span>
        {#if children.length > 0}
          <Icon type="chevron-down" size={12} class="transform transition-transform group-hover:rotate-180" />
        {/if}
      </div>
    </a>
  {:else}
    <div class={buttonClasses}>
      <span class={flamboyant ? 'gradient-text' : ''}>{navigation.name}</span>
      {#if children.length > 0}
        <Icon type="chevron-down" size={12} class="transform transition-transform group-hover:rotate-180" />
      {/if}
    </div>
  {/if}

  {#if children.length > 0}
    <ul
      class="dropdown-content absolute top-full left-0 flex flex-col items-start p-[6px] w-auto bg-elevated-background z-[1] shadow rounded-box body-regular mt-[14px] min-w-[220px]"
      style="pointer-events: all; visibility: {isOpen ? 'visible' : 'hidden'}; opacity: {isOpen ? 1 : 0};">
      <slot />
    </ul>
  {/if}
</div>

<style lang="css">
  .gradient-text {
    background: linear-gradient(84deg, #e81899 -33.76%, #ffc6e9 77.6%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 16px;
    font-weight: 500;
    line-height: 125.5%; /* 20.08px */
    letter-spacing: -0.32px;
  }

  .dropdown-content {
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 200ms ease,
      visibility 200ms ease;
  }

  .dropdown-content.show {
    opacity: 1;
    visibility: visible;
  }
</style>

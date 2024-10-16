<script lang="ts">
  import { derived } from 'svelte/store';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '$shared/components/Icon/Icon.svelte';
  import { classNames } from '$shared/utils/classNames';

  import type { NavigationData } from './types';

  export let children: NavigationData[] = [];
  export let navigation: NavigationData = {
    name: '',
    url: '/',
    route: '',
  };

  const currentPath = derived(page, ($page) => $page.url.pathname);

  // Button base classes used in multiple places
  const buttonBaseClasses = classNames(
    'btn',
    'btn-ghost',
    'text-base',
    'hover:cursor-pointer',
    'rounded-full',
    'h-fit',
    'lg:bg-neutral-background',
    'lg:hover:bg-elevated-background',
    'py-[12px]',
    'f-center',
  );

  // Additional classes for buttons with minimum width
  const buttonMinWidth = 'min-w-[140px]';

  // Additional classes for buttons with margin bottom
  const buttonMarginBottom = 'mb-2';

  // Dropdown container classes
  const dropdownContainerClasses = classNames(
    'dropdown',
    'dropdown-hover',
    'dropdown-bottom',
    'rounded-full',
    'lg:bg-container',
  );

  // Dropdown content classes
  const dropdownContentClasses = classNames(
    'dropdown-content',
    'flex',
    'flex-col',
    'items-start',
    'py-[24px]',
    'pl-[24px]',
    'pr-[43px]',
    'gap-[22px]',
    'bg-neutral-background',
    'opacity-100',
    'z-[1]',
    'shadow',
    'rounded-box',
    'w-fit',
    'body-regular',
  );

  // Icon container classes
  const iconContainerClasses = classNames(
    'f-center',
    'items-center',
    'gap-4',
    'hover:cursor-pointer',
    'hover:text-primary-brand',
  );

  // Link classes within dropdown
  const dropdownLinkClasses = classNames('flex', 'items-center', 'gap-4');

  // Button within dropdown
  const dropdownButtonClasses = classNames(
    'flex',
    'items-center',
    'gap-4',
    'hover:cursor-pointer',
    'hover:text-primary-brand',
  );

  // External link container classes
  const externalLinkContainerClasses = classNames('flex', 'flex-grow', 'justify-end');
</script>

{#if children.length > 0}
  <div class={dropdownContainerClasses}>
    {#if navigation.url}
      <a class={classNames(buttonBaseClasses, buttonMinWidth)} href={navigation.url}>
        <div tabindex="0" role="button">{navigation.name} +</div>
      </a>
    {:else}
      <button class={classNames(buttonBaseClasses, buttonMinWidth, buttonMarginBottom)} tabindex="0">
        {navigation.name} +
      </button>
    {/if}

    <ul class={dropdownContentClasses}>
      {#each children as child}
        <li class={''}>
          {#if child.url}
            <div class={iconContainerClasses}>
              {#if child.icon}
                <Icon size={15} type={child.icon} />
              {/if}
              <a href={child.url} class:text-primary-brand={$currentPath === child.url} class={dropdownLinkClasses}>
                {child.name}
              </a>
            </div>
          {:else if child.route}
            <button
              on:click={() => goto(child.route || '')}
              class:text-primary-brand={$currentPath === child.route}
              class={dropdownButtonClasses}>
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
      class={classNames(buttonBaseClasses, externalLinkContainerClasses)}>
      {navigation.name}
      <div class={externalLinkContainerClasses}>
        <Icon type="arrow-top-right" class="justify-self-end" />
      </div>
    </div>
  </a>
{:else}
  <button
    on:click={() => goto(navigation.route || '')}
    class:text-primary-brand={$currentPath.startsWith(navigation.route || '')}
    class={classNames(buttonBaseClasses, buttonMinWidth, buttonMarginBottom)}>
    {navigation.name}
  </button>
{/if}

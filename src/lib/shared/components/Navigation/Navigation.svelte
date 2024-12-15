<script lang="ts">
  import { type NavigationItem, routes } from '$shared/routes';
  import { classNames } from '$shared/utils/classNames';

  import NavigationChild from './NavigationChild.svelte';
  import NavigationParent from './NavigationParent.svelte';

  const wrapperClasses = classNames('hidden xl:flex w-full items-center', 'ml-[16px]');

  const safeRoutes: NavigationItem[] = routes ?? [];
</script>

<div class={wrapperClasses}>
  <!-- Center navigation items -->
  <div class="flex gap-1">
    {#each safeRoutes.slice(0, -1) as route}
      <NavigationParent navigation={route}>
        {#if route.children}
          {#each route.children as child (child.name)}
            <NavigationChild navigation={child} />
          {/each}
        {/if}
      </NavigationParent>
    {/each}
  </div>

  <!-- Last item to the far right -->
  {#if safeRoutes.length > 0}
    <div class="ml-auto">
      <NavigationParent navigation={safeRoutes[safeRoutes.length - 1]}>
        {#if safeRoutes[safeRoutes.length - 1].children}
          {#each safeRoutes[safeRoutes.length - 1].children ?? [] as child (child.name)}
            <NavigationChild navigation={child} />
          {/each}
        {/if}
      </NavigationParent>
    </div>
  {/if}
</div>

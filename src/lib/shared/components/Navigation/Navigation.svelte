<script lang="ts">
  import { classNames } from '$shared/utils/classNames';
  import { routes } from '$shared/utils/routes';

  import NavigationChild from './NavigationChild.svelte';
  import NavigationParent from './NavigationParent.svelte';

  const wrapperClasses = classNames('hidden xl:flex gap-2');
</script>

<!--  Desktop Only -->
<div class={wrapperClasses}>
  <div class="f-center gap-2">
    {#each routes as route}
      <NavigationParent navigation={route}>
        {#if route.children}
          {#each route.children as child}
            <NavigationChild navigation={child}></NavigationChild>
          {/each}
        {/if}
      </NavigationParent>
    {/each}
  </div>
</div>

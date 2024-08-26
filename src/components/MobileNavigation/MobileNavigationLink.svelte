<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Icon } from '$components/Icon';
  import type { NavigationItem } from '$libs/routes';

  const dispatch = createEventDispatcher();
  function handleClick() {
    dispatch('navigate');
  }

  export let navigation: NavigationItem;

  let url = navigation.route;
  let label = navigation.name;
  let icon = navigation.icon || 'nav-about';
</script>

<button on:click={handleClick}>
  <a href={url} class="flex items-center gap-4 hover:text-primary-brand"> <Icon size={14} type={icon}></Icon>{label}</a>
</button>

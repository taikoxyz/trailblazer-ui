<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Icon } from '$shared/components/Icon';
  import type { NavigationItem } from '$shared/routes';

  const dispatch = createEventDispatcher();
  function handleClick() {
    dispatch('navigate');
  }

  export let navigation: NavigationItem;

  let url = navigation.route;
  let label = navigation.name;
  let icon = navigation.icon || 'nav-about';
</script>

<button class="hover:bg-neutral-background px-[16px] py-[14px] rounded-full" on:click={handleClick}>
  <a href={url} class="flex items-center hover:text-primary-content gap-[12px]">
    <Icon size={20} type={icon} fillClass="fill-primary-interactive-accent" />
    {label}
  </a>
</button>

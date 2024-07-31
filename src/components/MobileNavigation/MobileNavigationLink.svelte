<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Icon, type IconType } from '$components/Icon';

  const dispatch = createEventDispatcher();
  function handleClick() {
    dispatch('navigate');
  }

  export let url: string;
  export let label: string;
  export let icon: IconType = 'star2';
</script>

<button on:click={handleClick}>
  <a href={url} class="flex items-center gap-4 hover:text-primary-brand"> <Icon size={14} type={icon}></Icon>{label}</a>
</button>

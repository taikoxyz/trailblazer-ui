<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Icon } from '$components/Icon';

  const dispatch = createEventDispatcher();
  function handleClick() {
    dispatch('navigate');
  }

  export let url: string;
  export let label: string;
</script>

<button on:click={handleClick}>
  <a href={url} class="flex items-center gap-4">
    <Icon class="flex size-4" vWidth={14} vHeight={14} type="star2"></Icon>{label}</a>
</button>

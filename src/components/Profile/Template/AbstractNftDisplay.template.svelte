<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let items: (typeof SvelteComponent)[] = [];
</script>

<div class="box gap-4">
  {#each items as item}
    <svelte:component this={item} />
  {/each}
</div>

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 25px;
  }
</style>

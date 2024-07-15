<script>
  import { onMount } from 'svelte';
  import { toast } from '@zerodevx/svelte-toast'; // Assuming you are using svelte-toast for notifications

  let leaderboardData = [];
  let error = null;


</script>

{#if error}
  <p class="error">{error}</p>
{:else}
  <slot {leaderboardData}></slot>
{/if}

<style>
  .error {
    color: red;
  }
</style>
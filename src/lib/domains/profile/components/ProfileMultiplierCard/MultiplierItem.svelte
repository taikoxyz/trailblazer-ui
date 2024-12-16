<script lang="ts">
  import Spinner from '$shared/components/Spinner/Spinner.svelte';

  import { profileLoading } from '../../stores';

  export let label: string;
  export let multiplierView: { multiplier: number; max: boolean };
</script>

<li class="f-between-center">
  <span class="text-secondary-content">{label}</span>
  <div class="space-x-[10px]">
    {#if $profileLoading}
      <Spinner size="sm" />
    {:else if multiplierView.max}
      <span class="text-negative-sentiment uppercase">Max</span>
      <span class="text-primary-content">{multiplierView.multiplier}x</span>
    {:else}
      <span class="text-primary-content">{multiplierView.multiplier}x</span>
    {/if}
  </div>
</li>

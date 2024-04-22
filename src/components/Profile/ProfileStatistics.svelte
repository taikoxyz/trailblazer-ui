<script>
  import StatisticItem from './StatisticItem.svelte';

  let statistics = [1];
</script>

<div class=" flex flex-col bg-elevated-background p-5 gap-10 rounded-3xl">
  <div>Statistics</div>

  <div class="flex flex-col">
    <div>last active</div>
    <div>20234/01/15</div>
  </div>

  {#each statistics as statistic}
    <StatisticItem />
  {/each}
</div>

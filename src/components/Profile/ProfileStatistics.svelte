<script>
  import { MOCK_USER_STATISTICS } from '$mocks';

  import StatisticItem from './StatisticItem.svelte';

  let statistics = MOCK_USER_STATISTICS;
</script>

<div class=" flex flex-col bg-elevated-background p-5 gap-10 rounded-3xl">
  <div class="body-bold">Statistics</div>

  <div class="flex flex-col">
    <div class="body-small-regular text-tertiary-content">Last active</div>
    <div>2024/01/15</div>
  </div>

  <div class="flex flex-col gap-2 overflow-y-scroll max-h-[300px]">
    {#each statistics as statistic}
      <StatisticItem {statistic} />
    {/each}
  </div>
</div>

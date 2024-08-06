<script>
  import { MOCK_USER_STATISTICS } from '$mocks';

  import StatisticItem from './StatisticItem.svelte';

  let statistics = MOCK_USER_STATISTICS;
</script>

<div class="flex gap-2 overflow-y-scroll max-h-[300px]">
  {#each statistics as statistic}
    <StatisticItem {statistic} />
  {/each}
</div>

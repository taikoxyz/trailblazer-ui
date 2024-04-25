<script>
  import { MOCK_USER_BOOSTERS } from 'src/tests/mocks/userBoosters';
  import StatisticItem from './StatisticItem.svelte';
  import BoosterItem from './BoosterItem.svelte';

  let boosters = MOCK_USER_BOOSTERS;
</script>

<div class="flex gap-2 overflow-x-scroll max-h-[300px]">
  {#each boosters as statistic}
    <BoosterItem />
  {/each}
</div>

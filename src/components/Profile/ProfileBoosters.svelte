<script>
  import { MOCK_USER_BOOSTERS } from 'src/tests/mocks/userBoosters';
  import StatisticItem from './StatisticItem.svelte';
  import BoosterItem from './BoosterItem.svelte';

  let boosters = MOCK_USER_BOOSTERS;
</script>

<div class="grid grid-cols-4 gap-5">
  {#each boosters as booster}
    <BoosterItem data={booster} />
  {/each}
</div>

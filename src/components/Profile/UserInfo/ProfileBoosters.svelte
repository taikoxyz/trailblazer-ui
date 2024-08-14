<script>
  import { MOCK_USER_BOOSTERS } from '$mocks';

  import BoosterItem from '../BoosterItem.svelte';

  let boosters = MOCK_USER_BOOSTERS;
</script>

<div class="box">
  {#each boosters as booster}
    <BoosterItem data={booster} />
  {/each}
</div>

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 10px;
    margin: 20px;
  }
</style>

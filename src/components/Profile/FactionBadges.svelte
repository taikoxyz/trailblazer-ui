<script>
  import { MOCK_USER_FACTIONS } from 'src/tests/mocks/userFactions';
  import FactionBadgeItem from './FactionBadgeItem.svelte';

  let factions = MOCK_USER_FACTIONS;
</script>

<div class="box">
  {#each factions as faction}
    <FactionBadgeItem data={faction} />
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

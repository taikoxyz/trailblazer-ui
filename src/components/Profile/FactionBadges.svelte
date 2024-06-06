<script>
  import { classNames } from '$libs/util/classNames';
  import { MOCK_USER_FACTIONS } from '$mocks';

  import FactionBadgeItem from './FactionBadgeItem.svelte';

  let factions = MOCK_USER_FACTIONS;
</script>

<div class="box gap-4">
  {#each factions as faction}
    <FactionBadgeItem data={faction} />
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

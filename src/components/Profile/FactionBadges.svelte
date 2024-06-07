<script lang="ts">
  import { getUserBadges } from '$libs/badges/getUserBadges';
  import { classNames } from '$libs/util/classNames';
  import { MOCK_USER_FACTIONS } from '$mocks';
  import { account } from '$stores/account';
  import { onMount } from 'svelte';

  import FactionBadgeItem from './FactionBadgeItem.svelte';
  import { FactionNames } from '$configs/badges';

  let factions = Object.keys(FactionNames) as FactionNames[];
  $: userFactions = {} as Record<FactionNames, boolean>;

  const mockLockedMap: Record<FactionNames, boolean> = {
    [FactionNames.Ravers]: true,
    [FactionNames.Robots]: true,
    [FactionNames.Bouncers]: true,
    [FactionNames.Masters]: true,
    [FactionNames.Monks]: false,
    [FactionNames.Drummers]: false,
    [FactionNames.Androids]: false,
    [FactionNames.Shinto]: false,
  };
  async function load() {
    if (!$account || !$account.address) return;
    userFactions = await getUserBadges($account.address);
  }

  $: $account, load();
</script>

<div class="box gap-4">
  {#each factions as faction}
    <FactionBadgeItem name={faction} claimable={mockLockedMap[faction]} unlocked={userFactions[faction]} />
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

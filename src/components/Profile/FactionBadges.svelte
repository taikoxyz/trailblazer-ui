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

  async function load() {
    if (!$account || !$account.address) return;
    userFactions = await getUserBadges($account.address);
    console.log({ userFactions });
  }

  $: $account, load();
</script>

<div class="box gap-4">
  {#each factions as faction}
    <FactionBadgeItem name={faction} claimable={!userFactions[faction]} unlocked={userFactions[faction]} />
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

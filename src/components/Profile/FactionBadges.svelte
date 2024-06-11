<script lang="ts">
  import { type Address, zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { FactionNames } from '$configs/badges';
  import { getUserBadges } from '$libs/badges/getUserBadges';
  import { account } from '$stores/account';

  import FactionBadgeItem from './FactionBadgeItem.svelte';

  let factions = Object.keys(FactionNames) as FactionNames[];
  $: userFactions = {} as Record<FactionNames, boolean>;

  const mockClaimableMap: Record<FactionNames, boolean> = {
    [FactionNames.Ravers]: true,
    [FactionNames.Robots]: false,
    /*
    [FactionNames.Bouncers]: false,
    [FactionNames.Masters]: false,
    [FactionNames.Monks]: false,
    [FactionNames.Drummers]: false,
    [FactionNames.Androids]: false,
    [FactionNames.Shinto]: false,
    */
  };

  async function load() {
    const urlAddress = $page.url.pathname.split('/').pop();
    address = urlAddress as Address;

    userFactions = await getUserBadges(address);
  }
  $: address = zeroAddress as Address;
  $: $account, load();
</script>

<div class="box gap-4">
  {#each factions as faction}
    <FactionBadgeItem {address} name={faction} claimable={mockClaimableMap[faction]} unlocked={userFactions[faction]} />
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

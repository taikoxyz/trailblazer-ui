<script lang="ts">
  import { type Address, getAddress,zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { FactionNames } from '$configs/badges';
  import getMovement from '$libs/badges/getMovement';
  import { getUserBadges } from '$libs/badges/getUserBadges';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { account } from '$stores/account';
  import { currentProfile } from '$stores/profile';

  import FactionBadgeItem from './FactionBadgeItem.svelte';

  let factions = Object.keys(FactionNames).reverse() as FactionNames[];
  $: userFactions = {} as Record<FactionNames, boolean>;

  $: profile = $currentProfile;
  $: movement = -1;

  $: isSelfProfile = false;

  async function load() {
    const urlAddress = $page.url.pathname.split('/').pop();
    address = urlAddress as Address;
    movement = await getMovement(address);
    userFactions = await getUserBadges(address);
    isSelfProfile = getAddress(address) === getAddress(getConnectedAddress());
  }
  $: address = zeroAddress as Address;
  $: $account, load();
  $: profile, load();
</script>

<div class="box gap-4">
  {#each factions as faction}
    <FactionBadgeItem
      {address}
      {movement}
      canClick={isSelfProfile && !userFactions[faction]}
      name={faction}
      unlocked={userFactions[faction]} />
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

<script lang="ts">
  import { type Address, getAddress, zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { FactionNames, maxBadgeId } from '$configs/badges';
  import { getUserBadges } from '$libs/badges/badgesSubGraph';
  import gasCheckPreflight from '$libs/badges/gasCheckPreflight';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { account } from '$stores/account';
  import { currentProfile } from '$stores/profile';

  import FactionBadgeItem from './Season1FactionBadgeItem.svelte';

  let factions = Object.keys(FactionNames).splice(0, maxBadgeId).reverse() as FactionNames[];
  $: userFactions = {
    [FactionNames.Ravers]: false,
    [FactionNames.Robots]: false,
    [FactionNames.Bouncers]: false,
    [FactionNames.Masters]: false,
    [FactionNames.Monks]: false,
    [FactionNames.Androids]: false,
    [FactionNames.Drummers]: false,
    [FactionNames.Shinto]: false,
  } as Record<FactionNames, boolean>;

  $: profile = $currentProfile;
  $: movement = 0;

  $: isSelfProfile = false;
  $: hasEnoughGas = true;

  $: isLoading = false;
  $: isReady = false;

  async function load() {
    if (isLoading || isReady) return;
    isLoading = true;
    const urlAddress = $page.url.pathname.split('/').pop();
    address = urlAddress as Address;
    userFactions = await getUserBadges(address);
    isSelfProfile = getAddress(address) === getAddress(getConnectedAddress());
    hasEnoughGas = await gasCheckPreflight(address);
    isLoading = false;
    isReady = true;
  }

  $: address = zeroAddress as Address;
  $: $account, load();
  $: profile, load();
</script>

<div class="mb-4">
  <div class="body-bold">Faction Badges</div>
  <div class="divider mt-0" />
  <div class="box gap-4">
    {#if factions.length}
      {#each factions as faction}
        <FactionBadgeItem
          enoughGas={hasEnoughGas}
          {address}
          {movement}
          canClick={isSelfProfile && !userFactions[faction]}
          name={faction}
          unlocked={userFactions[faction]} />
      {/each}
    {/if}
  </div>
</div>

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 25px;
  }
</style>

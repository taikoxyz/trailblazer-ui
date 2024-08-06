<script lang="ts">
  import { type Address, getAddress, zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { FactionNames, maxBadgeId } from '$configs/badges';
  import gasCheckPreflight from '$libs/badges/gasCheckPreflight';
  //import getMovement from '$libs/badges/getMovement';
  import { getUserBadges } from '$libs/badges/getUserBadges';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { account } from '$stores/account';
  import { currentProfile } from '$stores/profile';

  import FactionBadgeItem from './FactionBadges/FactionBadgeItem.svelte';
  import FactionBadges from './FactionBadges/FactionBadges.svelte';
  import { UserNFTs } from './TaikoNFTs';
  // import { default as MovementSelection } from './MovementSelection.modal.svelte';

  let factions = Object.keys(FactionNames).splice(0, maxBadgeId).reverse() as FactionNames[];
  $: userFactions = {} as Record<FactionNames, boolean>;

  $: profile = $currentProfile;
  $: movement = 0;

  $: isSelfProfile = false;
  $: hasEnoughGas = false;

  async function load() {
    const urlAddress = $page.url.pathname.split('/').pop();
    address = urlAddress as Address;
    //movement = await getMovement(address);
    userFactions = await getUserBadges(address);
    isSelfProfile = getAddress(address) === getAddress(getConnectedAddress());
    hasEnoughGas = await gasCheckPreflight(address);
  }

  $: address = zeroAddress as Address;
  $: $account, load();
  $: profile, load();

  //$: movementModalVisible = false;
</script>

<div>
  <FactionBadges />
  <UserNFTs />
</div>

<!--<MovementSelection bind:visible={movementModalVisible} />-->

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 25px;
  }
</style>

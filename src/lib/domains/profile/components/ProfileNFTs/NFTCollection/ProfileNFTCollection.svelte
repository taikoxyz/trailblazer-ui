<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { type Address, isAddressEqual, zeroAddress } from 'viem';

  import { page } from '$app/stores';
  import { taikoonTokenAddress } from '$generated/abi';
  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { badgeStore, snaefellStore, taikoonStore } from '$lib/domains/nfts/stores/nft.store';
  import { getMovementName } from '$lib/domains/profile/types/types';
  import { NftTypes } from '$lib/domains/profile/types/UserNFTs';
  import { chainId } from '$lib/shared/utils/chain';
  import type { BadgeDetailsByFaction, BadgeDetailsByMovement } from '$shared/types/NFT';
  import type { NFT } from '$shared/types/NFT';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import LoadingBlobby from '../../LoadingBlobby.svelte';
  import ProfileTab from '../../ProfileTab.svelte';
  import Collection from './Collection.svelte';

  let badgeMovements: BadgeDetailsByMovement | null = $badgeStore;
  let taikoons = $taikoonStore;
  let snaefell = $snaefellStore;
  let loading = true;

  const unsubscribeBadges = badgeStore.subscribe((value: BadgeDetailsByMovement | null) => {
    badgeMovements = value;
    loading = value === null;
  });

  const unsubscribeTaikoons = taikoonStore.subscribe((value) => {
    taikoons = value;
    loading = !value;
  });

  const unsubscribeSnaefell = snaefellStore.subscribe((value) => {
    snaefell = value;
    loading = !value;
  });

  // Get faction details and count unique badges
  const getFactionDetailsAndCount = (factions: BadgeDetailsByFaction) => {
    const details = Object.entries(factions).map(([faction, details]) => ({
      faction,
      ...details,
    }));

    const collected = details.filter(({ badge }) => badge !== null).length; // Count unique badges
    return { details, collected };
  };

  onMount(async () => {
    loading = true;
    let address = getConnectedAddress();
    if (!address || address === zeroAddress) {
      console.warn('No connected address found, using address from URL');
      address = $page.url.pathname.split('/').pop() as Address;
    }
    if (!address) return;
    const badges = await nftService.fetchBadgesForUser(address);
    const taikoonsAndSnaefell = await nftService.fetchTaikoTokensForUser(address);

    const [taikoons, snaefell] = taikoonsAndSnaefell.reduce<[NFT[], NFT[]]>(
      ([taikoons, snaefell], nft) => {
        isAddressEqual(nft.address, taikoonTokenAddress[chainId]) ? taikoons.push(nft) : snaefell.push(nft);
        return [taikoons, snaefell];
      },
      [[], []],
    );

    // // multipliy taikoons elements by 5
    // const temp = Array.from({ length: taikoons.length * 5 }, () => taikoons[0]);

    taikoonStore.set(taikoons);
    if (snaefell.length > 0) {
      snaefellStore.set(snaefell[0]);
    }
    badgeStore.set(badges);
    loading = false;
  });

  onDestroy(() => {
    unsubscribeBadges();
    unsubscribeTaikoons();
    unsubscribeSnaefell();
  });
</script>

<ProfileTab>
  <!-- <Debug /> -->

  <div class="space-y-[20px]">
    {#if loading}
      <LoadingBlobby />
    {:else if badgeMovements}
      {#each Object.entries(badgeMovements) as [movement, factions]}
        {@const movementName = getMovementName(Number(movement))}
        {@const { details, collected } = getFactionDetailsAndCount(factions)}
        {@const collectionName = getMovementName(Number(movement))}
        <Collection
          collectionType={NftTypes.BADGE}
          {collectionName}
          {collected}
          max={details.length}
          movement={Number(movement)}
          badges={details}
          image={`/multipliers/collection_${movementName.toLowerCase()}.svg`} />
      {/each}
    {:else}
      <p>No badges available.</p>
    {/if}
    {#if taikoons.length > 0 && !loading}
      <Collection
        collectionType={NftTypes.TAIKOON}
        collected={$taikoonStore.length}
        collectionName="Taikoon"
        max={1}
        movement="taikoon"
        badges={[{ faction: 'taikoon', badge: taikoons, total: taikoons.length }]}
        image="/multipliers/collection_taikoon.svg" />
    {/if}
    {#if snaefell && $snaefellStore && !loading}
      <Collection
        collectionType={NftTypes.SNAEFELL}
        collected={$snaefellStore ? 1 : 0}
        collectionName="Snaefell"
        max={1}
        movement="snaefell"
        badges={[{ faction: 'snaefell', badge: snaefell, total: snaefell ? 1 : 0 }]}
        image="/multipliers/collection_snaefell.svg" />
    {/if}
  </div>
</ProfileTab>

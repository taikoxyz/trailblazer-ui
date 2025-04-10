<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { type Address, getAddress, isAddressEqual } from 'viem';

  import { page } from '$app/stores';
  import { taikoonTokenAddress } from '$generated/abi';
  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { badgeStore, snaefellStore, taikoonStore } from '$lib/domains/nfts/stores/nft.store';
  import { getMovementName, Movements } from '$lib/domains/profile/types/types';
  import { NftTypes } from '$lib/domains/profile/types/UserNFTs';
  import { chainId } from '$lib/shared/utils/chain';
  import type { BadgeDetailsByFaction, BadgeDetailsByMovement, NFT, TBBadge } from '$shared/types/NFT';
  import { isBadgeLocked } from '$shared/utils/badges/isBadgeLocked';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import LoadingBlobby from '../../LoadingBlobby.svelte';
  import ProfileTab from '../../ProfileTab.svelte';
  import Collection from './Collection.svelte';
  import FullCollection from './FullCollection.svelte';

  let badgeMovements: BadgeDetailsByMovement | null = $badgeStore;
  let taikoons = $taikoonStore;
  let snaefell: NFT | null = $snaefellStore;
  let loading = true;
  let fullscreen = false;

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

  const getFactionDetailsAndCount = (factions: BadgeDetailsByFaction) => {
    const details = Object.entries(factions).map(([faction, data]) => ({
      faction,
      ...data,
    }));
    const collected = details.filter(({ badge }: { badge: TBBadge }) => badge !== null && !isBadgeLocked(badge)).length;
    return { details, collected };
  };

  let selectedCollectionNFTs: NFT[] = [];

  let clickedBadge: TBBadge;

  let selectedMovement: Movements | 'taikoon' | 'snaefell';

  const handleFullCollectionView = (
    event: CustomEvent<{ allBadges: NFT[]; movement: number; clickedBadge: TBBadge }>,
  ) => {
    fullscreen = true;
    selectedCollectionNFTs = event.detail.allBadges;
    selectedMovement = event.detail.movement;
    clickedBadge = event.detail.clickedBadge;
  };

  const handleClose = () => {
    fullscreen = false;
  };

  onMount(async () => {
    loading = true;
    const userAddress = getConnectedAddress();
    const urlAddress = $page.url.pathname.split('/').pop() as Address;

    if (!userAddress && !urlAddress) return;

    const isSelfProfile = getAddress(urlAddress) === getAddress(userAddress);
    const address = isSelfProfile ? userAddress : urlAddress;

    const badges = await nftService.fetchBadgesForUser(address);
    const taikoonsAndSnaefell = await nftService.fetchTaikoTokensForUser(address);

    const [resolvedTaikoons, resolvedSnaefell] = taikoonsAndSnaefell.reduce<[NFT[], NFT[]]>(
      ([tAcc, sAcc], nft) => {
        isAddressEqual(nft.address, taikoonTokenAddress[chainId]) ? tAcc.push(nft) : sAcc.push(nft);
        return [tAcc, sAcc];
      },
      [[], []],
    );

    taikoonStore.set(resolvedTaikoons);
    if (resolvedSnaefell.length > 0) {
      snaefellStore.set(resolvedSnaefell[0]);
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
  {#if fullscreen}
    <FullCollection badges={selectedCollectionNFTs} movement={selectedMovement} {clickedBadge} on:close={handleClose} />
  {:else}
    <div class="space-y-[20px]">
      {#if loading}
        <LoadingBlobby />
      {:else if badgeMovements}
        <span class="text-[18px] font-bold ml-[30px]">Badges</span>
        <div class="!mb-[50px] space-y-[30px]">
          {#each Object.entries(badgeMovements) as [movement, factions], index}
            {@const movementName = getMovementName(Number(movement))}
            {@const { details, collected } = getFactionDetailsAndCount(factions)}
            {@const collectionName = getMovementName(Number(movement))}
            {@const isFirst = index === 0}
            <Collection
              on:fullscreen={handleFullCollectionView}
              collectionType={NftTypes.BADGE}
              {collectionName}
              {collected}
              checked={isFirst}
              max={details.length}
              movement={Number(movement)}
              badges={details}
              image={`/multipliers/collection_${movementName.toLowerCase()}.svg`} />
          {/each}
        </div>
      {:else}
        <p>No badges available.</p>
      {/if}
      {#if (!loading && taikoons.length > 0) || snaefell}
        <span class="text-[18px] font-bold ml-[30px]">Others</span>
      {/if}
      {#if taikoons.length > 0 && !loading}
        <Collection
          collectionType={NftTypes.TAIKOON}
          collected={$taikoonStore.length}
          collectionName="Taikoon"
          max={1}
          movement="taikoon"
          nfts={$taikoonStore}
          image="/multipliers/collection_taikoon.svg" />
      {/if}
      {#if snaefell && $snaefellStore && !loading}
        <Collection
          collectionType={NftTypes.SNAEFELL}
          collected={$snaefellStore ? 1 : 0}
          collectionName="Snaefell"
          max={1}
          movement="snaefell"
          nfts={[snaefell]}
          image="/multipliers/collection_snaefell.svg" />
      {/if}
    </div>
  {/if}
</ProfileTab>

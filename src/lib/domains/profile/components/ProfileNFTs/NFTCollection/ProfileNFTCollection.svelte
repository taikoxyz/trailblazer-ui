<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { badgeStore, fetchBadges } from '$lib/domains/nfts/stores/nft.store';
  import { getMovementName } from '$lib/domains/profile/types/types';
  import type { BadgeDetailsByFaction } from '$shared/types/NFT';

  import ProfileTab from '../../ProfileTab.svelte';
  import Collection from './Collection.svelte';

  let badgeMovements = $badgeStore;
  let loading = true;

  const unsubscribe = badgeStore.subscribe((value) => {
    badgeMovements = value;
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

  onMount(() => {
    fetchBadges();
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<ProfileTab>
  {#if loading}
    <p>Loading badges...</p>
  {:else if badgeMovements}
    <div class="space-y-[20px]">
      {#each Object.entries(badgeMovements) as [movement, factions]}
        {@const movementName = getMovementName(Number(movement))}
        {@const { details, collected } = getFactionDetailsAndCount(factions)}
        <Collection
          {collected}
          max={details.length}
          movement={Number(movement)}
          badges={details}
          image={`/multipliers/collection_${movementName.toLowerCase()}.svg`} />
      {/each}
    </div>
  {:else}
    <p>No badges available.</p>
  {/if}
</ProfileTab>

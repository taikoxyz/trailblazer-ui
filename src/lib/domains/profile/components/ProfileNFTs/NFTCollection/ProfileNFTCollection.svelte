<script lang="ts">
  import { onMount } from 'svelte';
  import { zeroAddress } from 'viem';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { FactionNames } from '$lib/domains/nfts/types/badges/types';
  import { getMovementName, Movements } from '$lib/domains/profile/types/types';
  import type { BadgesByMovement, NFT } from '$shared/types/NFT';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import ProfileTab from '../../ProfileTab.svelte';
  import Collection from './Collection.svelte';

  // Initialize badgeMovements with an empty object for each movement
  let badgeMovements: BadgesByMovement = {
    [Movements.Devs]: {
      [FactionNames.Ravers]: [],
      [FactionNames.Robots]: [],
      [FactionNames.Bouncers]: [],
      [FactionNames.Masters]: [],
      [FactionNames.Monks]: [],
      [FactionNames.Drummers]: [],
      [FactionNames.Androids]: [],
      [FactionNames.Shinto]: [],
    },
    [Movements.Whales]: {
      [FactionNames.Ravers]: [],
      [FactionNames.Robots]: [],
      [FactionNames.Bouncers]: [],
      [FactionNames.Masters]: [],
      [FactionNames.Monks]: [],
      [FactionNames.Drummers]: [],
      [FactionNames.Androids]: [],
      [FactionNames.Shinto]: [],
    },
    [Movements.Minnows]: {
      [FactionNames.Ravers]: [],
      [FactionNames.Robots]: [],
      [FactionNames.Bouncers]: [],
      [FactionNames.Masters]: [],
      [FactionNames.Monks]: [],
      [FactionNames.Drummers]: [],
      [FactionNames.Androids]: [],
      [FactionNames.Shinto]: [],
    },
  };

  onMount(async () => {
    try {
      const connectedAddress = getConnectedAddress();
      if (connectedAddress !== zeroAddress) {
        const fetchedBadges = await nftService.fetchBadgesForUser(connectedAddress);

        Object.entries(fetchedBadges).forEach(([movement, factions]) => {
          const movementKey = movement as unknown as Movements;

          Object.entries(factions).forEach(([faction, nfts]) => {
            const factionKey = faction as keyof typeof FactionNames;
            badgeMovements[movementKey][factionKey] = nfts as NFT[];
          });
        });
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  });
  const getFlatNFTs = (factions: BadgesByMovement[Movements.Devs]): NFT[] => {
    return Object.values(factions).flat() as NFT[];
  };
</script>

<ProfileTab>
  <div class="space-y-[20px]">
    {#each Object.entries(badgeMovements) as [movement, factions]}
      {@const movementName = getMovementName(Number(movement))}
      <Collection
        collectionName={movementName}
        collected={Object.values(factions).flat().length}
        multiplier={Object.values(factions).flat().length / 8}
        nfts={getFlatNFTs(factions)}
        image={`/multipliers/collection_${movementName.toLowerCase()}.svg`} />
    {/each}
  </div>
</ProfileTab>

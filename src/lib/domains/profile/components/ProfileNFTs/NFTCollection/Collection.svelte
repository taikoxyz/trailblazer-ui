<script lang="ts">
  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { getMovementName, Movements } from '$lib/domains/profile/types/types';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import Spinner from '$shared/components/Spinner/Spinner.svelte';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import FactionBadgeItem from '../FactionBadges/FactionBadgeItem.svelte';
  import Placeholder from './Placeholder.svelte';

  // CSS classes
  const wrapperClasses = classNames('');
  const innerWrapperClasses = classNames(
    'rounded-[30px]',
    'px-[16px]',
    'py-[30px]',
    'bg-primary-base-content',
    'space-y-[50px]',
  );

  const buttonClasses = classNames('w-[157px]', 'font-bold');
  const collectionInfoWrapper = classNames('f-col', 'space-y-[30px]');
  const titleClasses = classNames(
    'text-[35px]',
    'font-medium',
    'leading-[42px]',
    'font-clash-grotesk',
    'f-row',
    'items-center',
    'gap-[16px]',
  );
  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold');
  const badgeWrapperClasses = classNames('grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-[15px]', 'items-center');

  export let movement: Movements;
  export let collected: number;
  export let image: string;
  export let nfts: NFT[];

  let nftsToDisplay: NFT[] = [];
  let loading = true;

  $: collectionName = getMovementName(movement);

  const BadgeMultiplier = {
    [Movements.Devs]: 0.05,
    [Movements.Whales]: 0.05,
    [Movements.Minnows]: 0.05,
  };

  const calculateMultiplier = () => {
    // get base multiplier from BadgeMultiplier object based on passed Movement
    const base = BadgeMultiplier[movement];

    // only nfts that are not frozen are counted
    return nfts.filter((nft) => !nft.frozen).reduce((acc) => acc + base, 0);
  };

  $: multiplier = calculateMultiplier();

  $: if (nfts?.length > 0) {
    Promise.all(
      nfts.map(async (nft) => {
        const path = await nftService.getStataticPath({ ...nft });
        return { ...nft, metadata: { ...nft.metadata, image: `${path}.png` } } as NFT;
      }),
    ).then((updatedNfts) => {
      // fill badges array with null values as placeholders
      const badges = Array(8).fill(null);
      updatedNfts.forEach((nft) => {
        const badgeId = nft.metadata.badgeId as number;
        if (badgeId >= 0 && badgeId < 8) {
          badges[badgeId] = nft;
        }
      });
      nftsToDisplay = badges;
      loading = false;
    });
  } else {
    // fill badges array with null values as placeholders
    nftsToDisplay = Array(8).fill(null);
    loading = false;
  }
</script>

<div class={wrapperClasses}>
  <div class={innerWrapperClasses}>
    <div class={collectionInfoWrapper}>
      <div class={titleClasses}><img src={image} alt={collectionName} />{collectionName}</div>
      <div class="space-y-[10px]">
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">Your multiplier</span>
          <span>+{multiplier}x</span>
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">Collected</span>
          <div>{collected}<span class="text-secondary-content">/8</span></div>
        </div>
      </div>
      <ActionButton class={buttonClasses} priority="primary">View collection</ActionButton>
    </div>
    <div class={badgeWrapperClasses}>
      {#if loading}
        <Spinner size="sm" />
      {:else}
        {#each nftsToDisplay as nft}
          <div class="flex justify-center">
            {#if nft}
              <FactionBadgeItem class="h-[130px] w-[130px] lg:w-[186px] lg:h-[186px]" token={nft} hideBubbles />
            {:else}
              <Placeholder />
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

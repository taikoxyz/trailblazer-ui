<script lang="ts">
  import { t } from 'svelte-i18n';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import type { FactionNames } from '$lib/domains/nfts/types/badges/types';
  import { getMovementName, Movements } from '$lib/domains/profile/types/types';
  import { Spinner } from '$shared/components';
  // import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import FactionBadgeItem from '../FactionBadges/FactionBadgeItem.svelte';
  import Placeholder from './Placeholder.svelte';

  const wrapperClasses = classNames('');
  const innerWrapperClasses = classNames(
    'rounded-[30px]',
    'px-[16px]',
    'py-[30px]',
    'bg-primary-base-content',
    'space-y-[50px]',
    'f-col',
    'items-center',
    'justify-center',
  );

  // const buttonClasses = classNames(
  //   'max-w-[157px]',
  //   'font-bold',
  //   'order-4',
  //   'md:order-1',
  //   'justify-end',
  //   'md:my-[-30px]',
  // );
  const collectionInfoWrapper = classNames(
    'space-y-[30px]',
    'w-full',
    'md:w-[565px]',
    'lg:w-[818px]',
    'flex',
    'flex-wrap',
    'justify-between',
  );
  const titleClasses = classNames(
    'w-1/2',
    'text-[35px]',
    'font-medium',
    'leading-[42px]',
    'font-clash-grotesk',
    'f-row',
    'items-center',
    'gap-[16px]',
    'order-1',
  );
  const collectionDetailsWrapperClasses = classNames('space-y-[10px]', ' w-full', 'order-3');
  const collectionDetailsRowClasses = classNames(
    'f-row',
    'justify-between',
    'font-bold',
    'w-full',
    'min-w-[274px]',
    'md:w-[565px]',
    'lg:w-[818px]',
  );
  const badgeWrapperClasses = classNames(
    'grid',
    'grid-cols-2',
    'md:grid-cols-4',
    'gap-[15px]',
    'items-center',
    'md:w-[565px]',
    'lg:w-[818px]',
    'justify-self-center',
    'justify-center',
  );

  export let movement: Movements;
  export let collected: number;
  export let image: string;
  export let max: number;
  export let badges: {
    faction: keyof typeof FactionNames;
    badge: NFT | null;
    total: number;
  }[] = [];

  let loading = true;
  let badgesToDisplay = [...badges];

  $: collectionName = getMovementName(movement);

  // Badge multiplier values
  const BadgeMultiplier = {
    [Movements.Devs]: 0.05,
    [Movements.Whales]: 0.05,
    [Movements.Minnows]: 0.05,
  };

  // Calculate multiplier based on non-frozen badges
  const calculateMultiplier = () => {
    const baseMultiplier = BadgeMultiplier[movement];
    return badgesToDisplay.reduce((acc, { badge }) => {
      return badge && !badge.frozen ? acc + baseMultiplier : acc;
    }, 0);
  };

  $: multiplier = calculateMultiplier();

  // Fetch image paths for badges
  $: if (badges?.length > 0 && loading) {
    loading = true;

    Promise.all(
      badges.map(async ({ badge }) => {
        if (badge) {
          const path = await nftService.getStataticPath({ ...badge });
          return { ...badge, metadata: { ...badge.metadata, image: `${path}.png` } } as NFT;
        }
        return null;
      }),
    )
      .then((results) => {
        badgesToDisplay = badges.map((item, index) => ({
          ...item,
          badge: results[index] || item.badge,
        }));
        loading = false;
      })
      .catch((error) => {
        console.error('Error fetching badge images:', error);
        loading = false;
      });
  }
</script>

<div class={wrapperClasses}>
  <div class={innerWrapperClasses}>
    <!-- Collection Header -->
    <div class={collectionInfoWrapper}>
      <div class={titleClasses}>
        <img src={image} alt={collectionName} />
        {collectionName}
      </div>
      <div class={collectionDetailsWrapperClasses}>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.multiplier')}</span>
          <span>+{multiplier.toFixed(2)}x</span>
        </div>
        <div class={collectionDetailsRowClasses}>
          <span class="text-secondary-content">{$t('nfts.collection.collected')}</span>
          <div>
            {collected}
            <span class="text-secondary-content">/{max}</span>
          </div>
        </div>
      </div>
      <!-- <ActionButton class={buttonClasses} priority="primary">View collection</ActionButton> -->
    </div>

    <div class={badgeWrapperClasses}>
      {#if loading}
        <Spinner size="sm" />
      {:else}
        {#each badgesToDisplay as { faction, badge, total }}
          <div class="flex flex-col items-center">
            {#if badge}
              <FactionBadgeItem
                class="h-[130px] w-[130px] max-h-[130px] max-w-[130px] lg:w-[186px] lg:h-[186px] lg:max-w-[186px] lg:max-h-[186px]"
                token={badge}
                hideBubbles />
            {:else}
              <Placeholder />
            {/if}

            <!-- Badge Details -->
            <div class="mt-2 text-center">
              <p class="font-bold capitalize">{faction}</p>
              <p class="text-secondary-content">Total: {total}</p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

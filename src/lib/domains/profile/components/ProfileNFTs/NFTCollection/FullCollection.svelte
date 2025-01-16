<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { NFT, TBBadge } from '$shared/types/NFT';
  import { Spinner } from '$shared/components';
  import { classNames } from '$shared/utils/classNames';
  import { FactionBadgeItem } from '../FactionBadges';
  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { Icon } from '$shared/components/Icon';
  import { t } from 'svelte-i18n';
  import { getMovementName, Movements, Multipliers } from '$lib/domains/profile/types/types';
  import { ExplorerLink } from '$shared/components/Links';

  const wrapperClasses = classNames('p-[20px]', 'f-col', 'gap-[30px]', 'justify-center', 'w-full');
  const gridClasses = classNames(
    'grid',
    'grid-cols-2',
    'xl:grid-cols-4',
    'gap-[24px]',
    'w-[325px]',
    'xl:w-[888px]',
    'justify-items-center',
  );

  const borderedBadgeBaseClasses = classNames(
    'w-full',
    'transition-all',
    'rounded-[30px]',
    'box-border',
    'aspect-square',
    'border',
    'border-[3px]',
  );

  const pinkBordered = classNames(borderedBadgeBaseClasses, 'bg-pink-200', 'border-pink-200');

  const pinkShadowed = classNames(
    borderedBadgeBaseClasses,
    pinkBordered,
    'bg-pink-200',
    'border-pink-200',
    'shadow-[0_0_20px_0px_rgba(255,111,200,1)]',
    'hover:shadow-[0_0_30px_0px_rgba(255,111,200,1)]',
  );

  export let badges: TBBadge[] | NFT[] = [];
  export let movement: Movements | 'taikoon' | 'snaefell';

  const dispatch = createEventDispatcher();

  const closeView = () => {
    dispatch('close');
  };

  let loading = true;
  let processedBadges: NFT[] | TBBadge[] = [];

  // Cache for media by movement
  const mediaCache: Map<string, NFT[]> = new Map();

  $: selectedBadge = badges[0];

  const handleBadgeClick = async (event: CustomEvent<{ badge: TBBadge }>) => {
    const badge = event.detail.badge;
    const metadata = await nftService.getNFTMetadata(selectedBadge);
    if (metadata) {
      if ('badgeId' in badge) {
        const path = await nftService.getStataticPath(badge);
        badge.metadata = {
          ...badge.metadata,
          image: `${path}.png`,
          'video/mp4': `${path}.mp4`,
        };
      }
      selectedBadge = { ...badge };
    } else {
      selectedBadge = badge;
    }
  };

  onMount(async () => {
    const cacheKey = typeof movement !== 'string' ? getMovementName(movement) : movement;
    if (mediaCache.has(cacheKey)) {
      processedBadges = mediaCache.get(cacheKey) || [];
      loading = false;
    } else {
      loading = true;
      processedBadges = await Promise.all(
        badges.map(async (badge) => {
          if (!badge.metadata.image) {
            // check whetcher its TBBadge or NFT
            if ('badgeId' in badge) {
              const path = await nftService.getStataticPath(badge);
              badge.metadata = {
                ...badge.metadata,
                image: `${path}.png`,
                'video/mp4': `${path}.mp4`,
              };
            }
          }
          return badge;
        }),
      );
      // set selected badge to first non frozen
      selectedBadge = processedBadges.find((badge) => !badge.frozen) || processedBadges[0];
      mediaCache.set(cacheKey, processedBadges);
      loading = false;
    }
  });

  const collectionDetailsWrapperClasses = classNames('space-y-[10px]', 'mt-[60px]', 'w-full', 'order-3');
  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full');
</script>

<div class={wrapperClasses}>
  <button on:click={closeView} class="btn btn-ghost rounded-full w-[50px] h-[50px] bg-neutral-background">
    <Icon type="chevron-left" />
  </button>
  <div class="f-row w-full gap-[24px]">
    {#if selectedBadge && 'badgeId' in selectedBadge}
      <div class="md:w-[324px] bg-elevated-background p-[24px] gap-[60px] rounded-[20px]">
        <FactionBadgeItem
          token={selectedBadge}
          class="max-h-[276px] max-w-[276px] lg:h-[276px] lg:w-[276px] rounded-[30px] "
          blurred={selectedBadge.frozen}
          hideBubbles />
        <div class={collectionDetailsWrapperClasses}>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.faction')}</span>
            <div>
              {selectedBadge.faction}
            </div>
          </div>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.team')}</span>
            <span> {typeof movement !== 'string' ? getMovementName(movement) : movement}</span>
          </div>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.multiplier')}</span>
            <span>+{Multipliers[movement]}x</span>
          </div>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.contract_address')}</span>
            <ExplorerLink shorten noIcon category="contract" urlParam={selectedBadge.address}>test</ExplorerLink>
          </div>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.token_id')}</span>
            <span> {selectedBadge.tokenId}</span>
          </div>
        </div>
      </div>
    {/if}
    {#if loading}
      <Spinner size="sm" />
    {:else}
      <div class="flex justify-center">
        <div class={gridClasses}>
          {#each processedBadges as badge}
            {#if 'badgeId' in badge}
              {@const isSelected = selectedBadge.tokenId === badge.tokenId}
              <FactionBadgeItem
                class="max-h-[150px] max-w-[150px] lg:max-h-[186px] lg:max-w-[186px] xl:max-h-[205px] xl:max-w-[205px] {isSelected
                  ? pinkShadowed
                  : ''} "
                token={badge}
                hideBubbles
                on:badgeclick={handleBadgeClick} />
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

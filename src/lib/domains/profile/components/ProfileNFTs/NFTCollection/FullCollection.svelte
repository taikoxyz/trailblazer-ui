<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { getMovementName, Movements } from '$lib/domains/profile/types/types';
  import { Spinner } from '$shared/components';
  import { Icon } from '$shared/components/Icon';
  import { activeRecruitmentStore } from '$shared/stores/recruitment';
  import type { NFT, TBBadge } from '$shared/types/NFT';
  import { isBadgeLocked } from '$shared/utils/badges/isBadgeLocked';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';
  import { isMobile } from '$shared/utils/responsiveCheck';

  import { FactionBadgeItem } from '../FactionBadges';
  import FullCollectionMobileModal from './FullCollectionMobileModal.svelte';
  import FullCollectionSidePanel from './FullCollectionSidePanel.svelte';

  const wrapperClasses = classNames(
    'f-col',
    '-mx-[15px]',
    'flex-1 w-full max-w-none',
    'f-col',
    'gap-[30px]',
    'items-center',
    'justify-center',
    'w-full',
  );
  const gridClasses = classNames(
    'grid',
    'grid-cols-2',
    'xl:grid-cols-4',
    'h-fit',
    'md:gap-[24px]',
    'gap-[12px]',
    'w-[325px]',
    'xl:w-[856px]',
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

  const hoverBorder = classNames(
    'border',
    'border-transparent',
    'border-[3px]',
    'hover:bg-pink-200',
    'hover:border-pink-200',
    'hover:shadow-[0_0_30px_0px_rgba(255,111,200,1)]',
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
  export let hasBackButton: boolean = true;
  export let clickedBadge: TBBadge | null = null;
  export let recruitingView: boolean = false;

  const dispatch = createEventDispatcher();
  const log = getLogger('FullCollection');

  const closeView = () => {
    dispatch('close');
    log('Close view');
  };

  let loading = true;

  $: reactiveBadges = [...badges];

  // Cache for media by movement
  const mediaCache: Map<string, NFT[]> = new Map();

  $: selectedBadge = $isMobile ? null : ((clickedBadge || reactiveBadges[0]) as TBBadge);

  $: detailsOpen = $isMobile && selectedBadge !== null;

  const handleBadgeClick = async (event: CustomEvent<{ badge: TBBadge }>) => {
    log('handleBadgeClick', event.detail.badge.tokenId);

    const badge = event.detail.badge;
    selectedBadge = badge;
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
      reactiveBadges = mediaCache.get(cacheKey) || [];
      loading = false;
    } else {
      loading = true;
      reactiveBadges = await Promise.all(
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
      selectedBadge = (reactiveBadges.find((badge) => !isBadgeLocked(badge as TBBadge)) ||
        reactiveBadges[0]) as TBBadge;
      reactiveBadges = [...reactiveBadges];
      mediaCache.set(cacheKey, reactiveBadges);
      loading = false;
    }
  });
</script>

<div class={wrapperClasses}>
  {#if hasBackButton}
    <button on:click={closeView} class="self-start btn btn-ghost rounded-full w-[50px] h-[50px] bg-neutral-background">
      <Icon type="chevron-left" />
    </button>
  {/if}
  <div class="f-row w-full gap-[24px]">
    {#if selectedBadge && 'badgeId' in selectedBadge && !$isMobile}
      <FullCollectionSidePanel {selectedBadge} {movement} {recruitingView} />
    {/if}

    {#if loading}
      <Spinner size="sm" />
    {:else}
      <div class="flex w-full justify-center items-center md:justify-start md:items-start">
        <div class={gridClasses}>
          {#each reactiveBadges as badge}
            {#if 'badgeId' in badge}
              {@const isSelected = selectedBadge && selectedBadge.tokenId === badge.tokenId}
              {@const displayIndicator =
                recruitingView &&
                $activeRecruitmentStore?.some((recruitment) => {
                  log(recruitment.badge.tokenId, badge.tokenId, recruitment.status);
                  return (
                    recruitment.badge.tokenId === badge.tokenId &&
                    recruitment.status !== 'COMPLETED' &&
                    badge.badgeId === recruitment.badge.badgeId
                  );
                })}
              <div class="indicator w-full">
                {#if displayIndicator}
                  <span
                    class="indicator-item badge size-[50px] bg-transparent border-none text-primary-content rounded-full p-0 z-50">
                    <Icon type="exclamation-circle" size={30} fillClass="fill-primary-brand" />
                  </span>
                {/if}
                <FactionBadgeItem
                  class="max-h-[150px] max-w-[150px] lg:max-h-[186px] lg:max-w-[186px] xl:max-h-[205px] {hoverBorder} xl:max-w-[205px] {isSelected
                    ? pinkShadowed
                    : ''} "
                  token={badge}
                  {recruitingView}
                  blurred={!recruitingView && isBadgeLocked(badge)}
                  hideBubbles
                  on:badgeClick={handleBadgeClick} />
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<FullCollectionMobileModal bind:detailsOpen {selectedBadge} {movement} {recruitingView} />

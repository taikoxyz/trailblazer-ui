<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-i18n';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { Movements, Multipliers } from '$lib/domains/profile/types/types';
  import { NftTypes } from '$lib/domains/profile/types/UserNFTs';
  import { Spinner } from '$shared/components';
  import type { BadgeDetails, NFT, TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import FactionBadgeItem from '../FactionBadges/FactionBadgeItem.svelte';
  import UserNftItem from '../Taikoons/UserNFTItem.svelte';
  import Placeholder from './Placeholder.svelte';

  const dispatch = createEventDispatcher();

  const uuid = crypto.randomUUID();

  export let collectionType: NftTypes;
  export let movement: Movements | 'taikoon' | 'snaefell';
  export let collected: number;
  export let image: string;
  export let max = -1;
  export let badges: BadgeDetails[] = [];
  export let nfts: NFT[] = [];
  export let collectionName: string;
  export let checked: boolean = false;

  let loading = true;
  let badgesToDisplay = [...badges];
  let nftsToDisplay = [...nfts];

  const wrapperClasses = classNames('');
  const containerClasses = classNames(
    'collapse',
    'collapse-arrow',
    'rounded-[30px]',
    'p-[25px]',
    'bg-primary-base-content',
    'f-col',
    'items-center',
    'justify-center',
  );
  const collectionInfoWrapper = classNames(
    'w-full',
    'md:f-row',
    'f-col',
    'justify-between',
    'md:items-center',
    'gap-[30px]',
  );
  const titleClasses = classNames(
    'min-w-[220px]',
    'text-[35px]',
    'font-medium',
    'leading-[42px]',
    'font-clash-grotesk',
    'f-row',
    'items-center',
    'gap-[16px]',
  );
  const collectionDetailsWrapperClasses = classNames('w-full', 'justify-between', 'f-row', 'space-x-[50px]');
  const collectionDetailsRowClasses = classNames('f-col', 'justify-between', 'font-bold', 'w-full');
  const badgeWrapperClasses = classNames(
    'grid',
    'grid-cols-2',
    'md:grid-cols-4',
    'gap-[15px]',
    'items-center',
    'w-full',
    'justify-self-center',
    'justify-center',
    'mt-[50px]',
  );
  const titleImageClasses = classNames('w-[50px]', 'h-[50px]');

  const pinkShadowed = classNames(
    'w-full',
    'transition-all',
    'rounded-[30px]',
    'box-border',
    'aspect-square',
    'border',
    'border-[3px]',
    'border-transparent',
    'hover:bg-pink-200',
    'hover:border-pink-200',
    'hover:shadow-[0_0_20px_0px_rgba(255,111,200,1)]',
    'hover:shadow-[0_0_30px_0px_rgba(255,111,200,1)]',
  );

  const calculateMultiplier = () => {
    const base = Multipliers[movement];
    return badgesToDisplay.reduce((acc, { badge }) => {
      if (Array.isArray(badge)) {
        return badge[0] && !badge[0].frozen ? acc + base : acc;
      }
      return badge && !badge.frozen ? acc + base : acc;
    }, 0);
  };

  $: multiplier = calculateMultiplier();

  const loadBadgeImage = async (badge: TBBadge) => {
    const path = await nftService.getStataticPath({ ...badge });
    return {
      ...badge,
      metadata: { ...badge.metadata, image: `${path}.png`, 'video/mp4': `${path}.mp4` },
    } as TBBadge;
  };

  const viewFullCollection = (event: { detail: { badge: TBBadge; badgeId: number } }) => {
    const all = badges.map(({ allBadges }) => allBadges || []).flat() as TBBadge[];
    const filteredBadges = all.filter((b) => b.badgeId === event.detail.badge.badgeId);
    dispatch('fullscreen', {
      collectionType,
      movement,
      allBadges: filteredBadges,
      clickedBadge: event.detail.badge,
    });
  };

  const loadSingleNft = async (token: NFT) => {
    const nft = await nftService.getNFTMetadata({ ...token });
    if (!nft) return null;
    return { ...token, metadata: { ...token.metadata, image: nft.image } } as NFT;
  };

  const fetchBadges = async () => {
    const promises = badges.map(async ({ badge }) => {
      if (!badge) return null;
      if (collectionType === NftTypes.BADGE && !Array.isArray(badge)) {
        return loadBadgeImage(badge as TBBadge);
      }
      if (collectionType === NftTypes.SNAEFELL || collectionType === NftTypes.TAIKOON) {
        if (Array.isArray(badge)) {
          const tokens = await Promise.all(badge.map(loadSingleNft));
          return tokens.filter(Boolean);
        }
        return loadSingleNft(badge);
      }
      return null;
    });
    return Promise.all(promises);
  };

  $: if (badges.length > 0 && loading) {
    loading = true;
    fetchBadges()
      .then((results) => {
        badgesToDisplay = badges.map((item, idx) => {
          const data = results[idx];
          if (Array.isArray(data)) {
            const filtered = data.filter((t): t is TBBadge => !!t);
            return { ...item, badge: filtered.length ? filtered : null, faction: item.faction };
          }
          return { ...item, badge: (data as TBBadge) || item.badge, faction: item.faction };
        }) as BadgeDetails[];
        loading = false;
      })
      .catch((err) => {
        console.error('Error fetching badge images:', err);
        loading = false;
      });
  }
  if (nfts.length > 0) {
    loading = false;
  }
</script>

<div class={wrapperClasses}>
  <div class={containerClasses}>
    <input type="checkbox" id={uuid} class="collapse-checkbox peer hidden" bind:checked />

    <label for={uuid} class="collapse-title items-center cursor-pointer p-0 m-0 w-full flex">
      <div class={collectionInfoWrapper}>
        <div class={titleClasses}>
          <img class={titleImageClasses} src={image} alt={collectionName} />
          {collectionName}
        </div>
        <div class={collectionDetailsWrapperClasses}>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.collected')}</span>
            <div>
              {collected}
              {#if max > 0}
                <span class="text-secondary-content">/{max}</span>
              {/if}
            </div>
          </div>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">Multiplier per Badge</span>
            <span>+{Multipliers[movement]}x</span>
          </div>
          <div class={collectionDetailsRowClasses}>
            <span class="text-secondary-content">{$t('nfts.collection.multiplier')}</span>
            <span>+{multiplier.toFixed(2)}x</span>
          </div>
        </div>
      </div>
    </label>

    <div
      class="collapse-content peer-checked:max-h-[100rem] max-h-0 overflow-hidden peer-checked:overflow-visible transition-all">
      {#if loading}
        <div class="flex justify-center">
          <Spinner size="sm" />
        </div>
      {:else}
        <div class={badgeWrapperClasses}>
          <!-- Badges -->
          {#if badgesToDisplay.length > 0}
            {#each badgesToDisplay as { badge, total, faction }}
              {#if badge && collectionType === NftTypes.BADGE && !Array.isArray(badge)}
                <div class="flex flex-col items-center">
                  <FactionBadgeItem
                    class="h-[130px] w-[130px] lg:w-[186px] lg:h-[186px] xl:w-[290px] xl:h-[290px] hover:{pinkShadowed}"
                    token={badge}
                    hideBubbles
                    on:badgeClick={viewFullCollection} />
                  <div class="mt-2 text-center">
                    <p class="font-bold capitalize">{faction}</p>
                    <p class="text-secondary-content">Total: {total}</p>
                  </div>
                </div>
              {:else}
                <div class="flex flex-col items-center">
                  <Placeholder />
                  <div class="mt-2 text-center">
                    <p class="font-bold capitalize">{faction}</p>
                    <p class="text-secondary-content">Total: {total}</p>
                  </div>
                </div>
              {/if}
            {/each}
            <!-- NFTS -->
          {:else if nftsToDisplay.length > 0}
            {#if Array.isArray(nftsToDisplay)}
              {#each nftsToDisplay as token, index}
                <UserNftItem
                  class="h-[130px] w-[130px] lg:w-[186px] lg:h-[186px] xl:w-[290px] xl:h-[290px]"
                  {token}
                  locked={index > 0}
                  hideBubbles />
              {/each}
            {:else}
              <UserNftItem token={nftsToDisplay} hideBubbles />
            {/if}
          {:else}
            <p>No badges available.</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

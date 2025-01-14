<script lang="ts">
  import { t } from 'svelte-i18n';

  import nftService from '$lib/domains/nfts/services/NFTServiceInstance';
  import { Movements } from '$lib/domains/profile/types/types';
  import { type BadgeType, NftTypes } from '$lib/domains/profile/types/UserNFTs';
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import FactionBadgeItem from '../FactionBadges/FactionBadgeItem.svelte';
  import UserNftItem from '../Taikoons/UserNFTItem.svelte';
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
  const buttonClasses = classNames(
    'max-w-[157px]',
    'font-bold',
    'order-4',
    'md:order-1',
    'justify-end',
    'md:my-[-30px]',
    '!min-h-[48px]',
    '!max-h-[48px]',
  );
  const collectionInfoWrapper = classNames(
    'w-full',
    'md:w-[565px]',
    'lg:w-[818px]',
    'flex',
    'flex-wrap',
    'justify-between',
    'items-center',
    'gap-[30px]',
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
  const collectionDetailsWrapperClasses = classNames('space-y-[10px]', 'w-full', 'order-3');
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

  const titleImageClasses = classNames('w-[50px]', 'h-[50px]');

  export let collectionType: NftTypes;
  export let movement: Movements | 'taikoon' | 'snaefell';
  export let collected: number;
  export let image: string;
  export let max = -1;
  export let badges: BadgeType[] = [];
  export let collectionName: string;

  let loading = true;
  let badgesToDisplay = [...badges];

  // Base multipliers
  const Multipliers = {
    [Movements.Devs]: 0.05,
    [Movements.Whales]: 0.05,
    [Movements.Minnows]: 0.05,
    taikoon: 1,
    snaefell: 0.1,
  };

  // Calculate final multiplier
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

  // Helper to load badge image
  const loadBadgeImage = async (badge: NFT) => {
    const path = await nftService.getStataticPath({ ...badge });
    return {
      ...badge,
      metadata: { ...badge.metadata, image: `${path}.png`, 'video/mp4': `${path}.mp4` },
    } as NFT;
  };

  // Helper to load single NFT
  const loadSingleNft = async (token: NFT) => {
    const nft = await nftService.getNFTMetadata({ ...token });
    if (!nft) return null;
    return { ...token, metadata: { ...token.metadata, image: nft.image } } as NFT;
  };

  // Fetch images for all badges
  const fetchBadges = async () => {
    const promises = badges.map(async ({ badge }) => {
      if (!badge) return null;
      if (collectionType === NftTypes.BADGE && !Array.isArray(badge)) {
        return loadBadgeImage(badge);
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

  // Trigger fetch on mount if needed
  $: if (badges.length > 0 && loading) {
    loading = true;
    fetchBadges()
      .then((results) => {
        badgesToDisplay = badges.map((item, idx) => {
          const data = results[idx];
          if (Array.isArray(data)) {
            const filtered = data.filter((t): t is NFT => !!t);
            return { ...item, badge: filtered.length ? filtered : null };
          }
          return { ...item, badge: data || item.badge };
        });
        loading = false;
      })
      .catch((err) => {
        console.error('Error fetching badge images:', err);
        loading = false;
      });
  }
</script>

<div class={wrapperClasses}>
  <div class={innerWrapperClasses}>
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
      <ActionButton class={buttonClasses} priority="primary">View collection</ActionButton>
    </div>

    <div class={badgeWrapperClasses}>
      {#if loading}
        <Spinner size="sm" />
      {:else}
        {#each badgesToDisplay as { faction, badge, total }}
          {#if badge && collectionType === NftTypes.BADGE && !Array.isArray(badge)}
            <div class="flex flex-col items-center">
              <FactionBadgeItem class="h-[130px] w-[130px] lg:w-[186px] lg:h-[186px]" token={badge} hideBubbles />
              <div class="mt-2 text-center">
                <p class="font-bold capitalize">{faction}</p>
                <p class="text-secondary-content">Total: {total}</p>
              </div>
            </div>
          {:else if badge && (collectionType === NftTypes.SNAEFELL || collectionType === NftTypes.TAIKOON)}
            {#if Array.isArray(badge)}
              {#each badge as token, index}
                <UserNftItem {token} locked={index > 0} hideBubbles />
              {/each}
            {:else}
              <UserNftItem token={badge} hideBubbles />
            {/if}
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
      {/if}
    </div>
  </div>
</div>

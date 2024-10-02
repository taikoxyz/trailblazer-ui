<script lang="ts">
  import { trailblazersBadgesAddress } from '$generated/abi';
  import { FACTIONS } from '$lib/domains/nfts/types/badges/types';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { classNames } from '$lib/shared/utils/classNames';
  import { Movements } from '$libs/badges/const';

  import { FactionBadgeItem } from './FactionBadges';
  import UserNftItem from './Taikoons/UserNFTItem.svelte';

  export let nfts: NFT[] = [];
  export let title: string = 'NFTs';

  // CSS
  const wrapperClasses = classNames('f-col', 'w-full', 'pb-[30px]');
  const titleClasses = classNames('text-grey-200', 'text-[16px]/[24px]');
  const dividerClasses = classNames('divider', 'mt-[18px]', 'mb-[30px]', 'p-0');
  const boxClasses = classNames('w-full');
  const nftGridClasses = classNames(
    'grid',
    'items-center',
    'place-content-center',
    'justify-items-center',
    'grid-cols-[repeat(auto-fill,_minmax(277px,_1fr))]',
    'gap-[24px]',
  );
</script>

<div class={wrapperClasses}>
  <div class={titleClasses}>{title}</div>
  <div class={dividerClasses} />
  <div class={boxClasses}>
    <div class={nftGridClasses}>
      {#if nfts.length}
        {#each nfts as { address, src, badgeId }}
          {#if address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase()}
            <FactionBadgeItem name={FACTIONS[badgeId || 0]} movement={Movements.Neutral} />
          {:else}
            <UserNftItem imageUrl={src} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>

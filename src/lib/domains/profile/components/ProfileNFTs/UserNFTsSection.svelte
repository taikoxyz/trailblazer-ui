<script lang="ts">
  import { isAddressEqual } from 'viem';

  import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { classNames } from '$shared/utils/classNames';

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
        {#each nfts as nft}
          {#if isAddressEqual(nft.address, trailblazersBadgesAddress[chainId]) || isAddressEqual(nft.address, trailblazersBadgesS2Address[chainId])}
            <FactionBadgeItem token={nft} />
          {:else}
            <UserNftItem token={nft} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>

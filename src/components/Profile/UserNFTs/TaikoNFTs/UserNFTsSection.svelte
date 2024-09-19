<script lang="ts">
  import { FACTIONS } from '$configs/badges';
  import { trailblazersBadgesAddress } from '$generated/abi';
  import { Movements } from '$libs/badges/const';
  import { chainId } from '$libs/chain';
  import type { IPfp } from '$libs/pfp/types';
  import { classNames } from '$libs/util/classNames';

  import { FactionBadgeItem } from '../FactionBadges';
  import UserNftItem from './UserNFTItem.svelte';

  export let nfts: IPfp[] = [];
  export let title: string = 'NFTs';

  // CSS
  const wrapperClasses = classNames('flex', 'flex-col');
  const titleClasses = classNames('text-grey-200', 'text-[16px]/[24px]');
  const dividerClasses = classNames('divider', 'mt-[18px]', 'mb-[30px]', 'p-0');
  const boxClasses = classNames('grid', 'gap-4');
  const nftGridClasses = classNames('grid', 'grid-cols-[repeat(auto-fill,_minmax(306px,_1fr))]', 'gap-[25px]');
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

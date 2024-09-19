<script lang="ts">
  import { Spinner } from '$components/Spinner';
  import { FACTIONS } from '$configs/badges';
  import { Movements } from '$libs/badges/const';
  import { chainId } from '$libs/chain';
  import type { IPfp } from '$libs/pfp/types';
  import { classNames } from '$libs/util/classNames';

  import { trailblazersBadgesAddress } from '../../../../generated/abi';
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

  const spinnerWrapperClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');
</script>

<div class={wrapperClasses}>
  <div class={titleClasses}>{title}</div>
  <div class={dividerClasses} />
  <div class={boxClasses}>
    {#if nfts.length}
      <div class={nftGridClasses}>
        {#each nfts as { address, src, badgeId }}
          {#if address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase()}
            <FactionBadgeItem name={FACTIONS[badgeId || 0]} movement={Movements.Neutral} />
          {:else}
            <UserNftItem imageUrl={src} />
          {/if}
        {/each}
      </div>
    {:else}
      <div class={spinnerWrapperClasses}>
        <Spinner size="lg" />
      </div>
    {/if}
  </div>
</div>

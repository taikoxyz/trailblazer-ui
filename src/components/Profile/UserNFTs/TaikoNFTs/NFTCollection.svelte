<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { browser } from '$app/environment';
  import { Spinner } from '$components/Spinner';
  import { chainId } from '$libs/chain';
  import getUserNFTs from '$libs/pfp/getUserNFTs';
  import type { IPfp } from '$libs/pfp/types';
  import { classNames } from '$libs/util/classNames';

  import { trailblazersBadgesAddress } from '../../../../generated/abi';
  import { UserNFTsSection } from '.';

  $: nfts = [] as IPfp[];
  $: badges = [] as IPfp[];
  $: isReady = false;

  onMount(async () => {
    if (!browser) return;
    const address = window.location.pathname.split('/').pop();
    if (!address) return;
    const allNfts = await getUserNFTs(address as Address);
    nfts = allNfts.filter((nft) => nft.address.toLowerCase() !== trailblazersBadgesAddress[chainId].toLowerCase());
    badges = allNfts.filter((nft) => nft.address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase());
    isReady = true;
  });

  const wrapperClasses = classNames('flex', 'flex-col', 'py-[8px]', 'gap-[62px]');
  const spinnerWrapperClasses = classNames('w-full', 'flex', 'justify-center', 'items-center');
</script>

<div class={wrapperClasses}>
  {#if isReady}
    {#if badges.length}
      <UserNFTsSection nfts={badges} title="Season 1 Faction Badges" />
    {/if}

    {#if nfts.length}
      <UserNFTsSection {nfts} title="NFTs" />
    {/if}
  {:else}
    <div class={spinnerWrapperClasses}>
      <Spinner size="lg" />
    </div>
  {/if}
</div>

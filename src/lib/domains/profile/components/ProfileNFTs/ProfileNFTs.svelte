<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { browser } from '$app/environment';
  import { Spinner } from '$components/Spinner';
  import type { NFT } from '$lib/shared/types/NFT';
  import { classNames } from '$libs/util/classNames';

  import profileService from '../../services/ProfileServiceInstance';
  import { userProfile } from '../../stores/profileStore';
  import { UserNFTsSection } from './TaikoNFTs';

  $: nfts = [] as NFT[];
  $: badges = [] as NFT[];
  $: isReady = false;

  onMount(async () => {
    if (!browser) return;
    const address = window.location.pathname.split('/').pop();
    if (!address) return;
    await profileService.getProfileWithNFTs(address as Address);

    nfts = $userProfile.nfts || [];

    // nfts = allNfts.filter((nft) => nft.address.toLowerCase() !== trailblazersBadgesAddress[chainId].toLowerCase());
    // badges = allNfts.filter((nft) => nft.address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase());
    isReady = true;
  });

  const wrapperClasses = classNames(
    'flex',
    'flex-col',
    'py-[8px]',
    'gap-[62px]',
    'bg-elevated-background',
    'rounded-[30px]',
    'px-[32px]',
    'justify-center',
    'items-center',
  );
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

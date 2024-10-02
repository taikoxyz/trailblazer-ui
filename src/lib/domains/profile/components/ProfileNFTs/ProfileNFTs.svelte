<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { browser } from '$app/environment';
  import { Button } from '$components/Button';
  import RotatingIcon from '$components/Icon/RotatingIcon.svelte';
  import { Spinner } from '$components/Spinner';
  import { trailblazersBadgesAddress } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '$lib/domains/profile/stores';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { classNames } from '$libs/util/classNames';

  import UserNFTsSection from './UserNFTsSection.svelte';

  // Reactive variables
  $: nfts = [] as NFT[];
  $: badges = [] as NFT[];

  $: isLoading = $profileLoading;
  const handleRefresh = async () => {
    if (!browser) return;
    const address = window.location.pathname.split('/').pop();
    if (!address) return;
    await profileService.getProfileWithNFTs(address as Address);
  };

  onMount(async () => {
    const allNfts = $userProfile.nfts || [];

    nfts = allNfts.filter((nft) => nft.address.toLowerCase() !== trailblazersBadgesAddress[chainId].toLowerCase());
    badges = allNfts.filter((nft) => nft.address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase());
  });

  // CSS classes
  const spinnerWrapperClasses = classNames('w-full', ' flex', ' justify-center', ' items-center', 'h-[70px]');

  const containerClass = classNames(
    'container',
    'w-full',
    'bg-elevated-background',
    'xl:max-w-[1344px]',
    'sm:rounded-b-[30px]',
    'rounded-t-[30px]',
    'md:rounded-tl-none',
    'rounded-[30px]',
    'relative',
  );

  const rowClass = classNames(
    'relative',
    'grid',
    'items-center',
    'gap-x-[26px]',
    'px-[16px]',
    'pt-[34px]',
    'md:px-[47px]',
    'body-bold',
    'text-sm',
  );

  const infoTextClasses = classNames(
    'w-full',
    'text-center',
    'justify-center',
    'text-secondary-content',
    'items-center',
    'flex',
    'h-full',
    'min-h-[200px]',
  );
</script>

<div class={containerClass}>
  <div class={rowClass}>
    <Button
      type="neutral"
      shape="circle"
      class="bg-neutral rounded-full !w-[28px] !h-[28px] border-none absolute right-[20px] md:right-[48px] top-[30px]"
      on:click={handleRefresh}>
      <RotatingIcon loading={isLoading} type="refresh" size={13} />
    </Button>
    {#if isLoading}
      <div class={spinnerWrapperClasses}>
        <Spinner size="md" />
      </div>
    {:else}
      {#if badges.length}
        <UserNFTsSection nfts={badges} title="Season 1 Faction Badges" />
      {/if}

      {#if nfts.length}
        <UserNFTsSection {nfts} title="NFTs" />
      {/if}

      {#if !badges.length && !nfts.length}
        <div class={infoTextClasses}>
          <p>No relevant NFTs found</p>
        </div>
      {/if}
    {/if}
  </div>
</div>

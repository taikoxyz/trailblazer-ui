<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';
  import { isAddressEqual } from 'viem';

  import { browser } from '$app/environment';
  import { trailblazersBadgesAddress, trailblazersBadgesS2Address } from '$generated/abi';
  import profileService from '$lib/domains/profile/services/ProfileServiceInstance';
  import { profileLoading, userProfile } from '$lib/domains/profile/stores';
  import type { NFT } from '$lib/shared/types/NFT';
  import { chainId } from '$lib/shared/utils/chain';
  import { Button } from '$shared/components/Button';
  import RotatingIcon from '$shared/components/Icon/RotatingIcon.svelte';
  import { Spinner } from '$shared/components/Spinner';
  import { classNames } from '$shared/utils/classNames';
  import filterBadges from '$shared/utils/nfts/filterBadges';

  import { Seasons } from '../../types/types';
  import UserNFTsSection from './UserNFTsSection.svelte';

  // Reactive variables
  $: nfts = [] as NFT[];
  $: s1Badges = [] as NFT[];
  $: s2Badges = [] as NFT[];

  $: isLoading = $profileLoading;
  const handleRefresh = async () => {
    if (!browser) return;
    const address = window.location.pathname.split('/').pop();
    if (!address) return;
    await profileService.getProfileWithNFTs(address as Address);
  };

  onMount(async () => {
    if (!$userProfile) return;
    const allNfts = $userProfile.nfts || [];

    nfts = allNfts.filter(
      (nft) =>
        !isAddressEqual(nft.address, trailblazersBadgesAddress[chainId]) &&
        !isAddressEqual(nft.address, trailblazersBadgesS2Address[chainId]),
    );

    s1Badges = filterBadges(Seasons.Season1, allNfts);
    s2Badges = filterBadges(Seasons.Season2, allNfts);
  });

  // CSS classes
  const spinnerWrapperClasses = classNames('w-full', ' flex', ' justify-center', ' items-center', 'h-[70px]');

  const containerClass = classNames(
    'container',
    'w-full',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
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
      {#if s1Badges.length}
        <UserNFTsSection nfts={s1Badges} title="Season 1 Faction Badges" />
      {/if}

      {#if s2Badges.length}
        <UserNFTsSection nfts={s2Badges} title="Recruited Faction Badges" />
      {/if}

      {#if nfts.length}
        <UserNFTsSection {nfts} title="NFTs" />
      {/if}

      {#if !s1Badges.length && !nfts.length}
        <div class={infoTextClasses}>
          <p>No relevant NFTs found</p>
        </div>
      {/if}
    {/if}
  </div>
</div>

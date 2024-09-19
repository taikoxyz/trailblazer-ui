<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { browser } from '$app/environment';
  import { chainId } from '$libs/chain';
  import getUserNFTs from '$libs/pfp/getUserNFTs';
  import type { IPfp } from '$libs/pfp/types';
  import { classNames } from '$libs/util/classNames';

  import { trailblazersBadgesAddress } from '../../../../generated/abi';
  import { UserNFTsSection } from '.';

  $: nfts = [] as IPfp[];
  $: badges = [] as IPfp[];

  onMount(async () => {
    if (!browser) return;
    const address = window.location.pathname.split('/').pop();
    if (!address) return;
    const allNfts = await getUserNFTs(address as Address);
    nfts = allNfts.filter((nft) => nft.address.toLowerCase() !== trailblazersBadgesAddress[chainId].toLowerCase());
    badges = allNfts.filter((nft) => nft.address.toLowerCase() === trailblazersBadgesAddress[chainId].toLowerCase());
  });

  const wrapperClasses = classNames('flex', 'flex-col', 'py-[8px]', 'gap-[62px]');
</script>

<div class={wrapperClasses}>
  <UserNFTsSection nfts={badges} title="Season 1 Faction Badges" />
  <UserNFTsSection {nfts} title="NFTs" />
</div>

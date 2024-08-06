<script lang="ts">
  import { currentProfile } from '$stores/profile';
  import UserNftItem from './UserNFTItem.svelte';
</script>

<div class="mb-4">
  <div class="body-bold">NFTs</div>
  <div class="divider mt-0" />
  <div class="box gap-4">
    {#if $currentProfile.nfts}
      {#each $currentProfile.nfts as nft}
        <UserNftItem imageUrl={nft.uri} explorerLink={nft.explorerLink} />
      {/each}
    {:else}
      <div class="text-center">No NFTs found</div>
    {/if}
  </div>
</div>

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 25px;
  }
</style>

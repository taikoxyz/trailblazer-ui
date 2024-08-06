<script lang="ts">
  import UserNftItem from './UserNftItem.svelte';

  let nfts: any[] = [];
</script>

<div class="box gap-4">
  {#each nfts as nft}
    <UserNftItem imageUrl={nft.imageUrl} explorerLink={nft.explorerLink} />
  {/each}
</div>

<style>
  /* 306px is the size of the card bg */
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
    gap: 25px;
  }
</style>

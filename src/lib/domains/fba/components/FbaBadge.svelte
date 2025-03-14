<script lang="ts">
  import { MovementNames, Movements } from "$lib/domains/profile/types/types";
  import type { NFT } from "$shared/types/NFT";


    export let token: NFT

    $: src = token.metadata.image as string || ''

    $: faction = MovementNames[token.metadata.movement as Movements] || 'Unknown'
</script>

<div class="border w-full">
    <img {src} alt="badge" class="w-full"/>
    <div class="flex justify-between text-xl px-2 py-1">
    <div>#{token.tokenId}</div>
    <div>{faction}s</div></div>
</div>

<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string; // bafybeierqzehlrqeqqeb6fwmil4dj3ij2p6exgoj4lysl53fsxwob6wbdy/414.json
  let imageUrl: string | null = null;
  async function fetchImage() {
    try {
      // Fetch the JSON file
      const response = await fetch(`https://taikonfts.4everland.link/ipfs/${src}`);
      const data = await response.json();

      // Get the image hash from the JSON
      const imageHash = data.image;

      // Set the image URL
      imageUrl = `https://taikonfts.4everland.link/ipfs/${imageHash}`;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  onMount(fetchImage);
</script>

<div class="relative w-full h-full z-0">
  {#if imageUrl}
    <img src={imageUrl} alt="NFT" class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20 w-full" />
  {:else}
    <div
      class="pointer-events-none rounded-[20px] absolute left-0 top-0 z-20 w-full h-full bg-gray-200 flex items-center justify-center">
      Loading...
    </div>
  {/if}
</div>

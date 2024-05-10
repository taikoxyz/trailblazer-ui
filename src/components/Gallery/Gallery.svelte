<script lang="ts">
  import { MOCK_FACTION_GALLERY, type GalleryItem } from '$mocks';

  export let items: GalleryItem[] = MOCK_FACTION_GALLERY;
</script>

<div class="f-center container px-16 py-16 gap-2">
  <!-- Cards -->
  {#each items as item, i}
    <div class="avatar relative max-w-full min-w-0 card">
      <div class="rounded-[30px] h-[400px]">
        <img class="" src={item.image} alt={item.image} />
        <div
          class="absolute flex card-contents left-2 top-2 h-full w-full flex-col font-clash-grotesk display-small-medium text-white">
          {#each 'RAVER'.split('') as letter, i}
            <div class="w-fit pink-glow">{letter}</div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .card {
    width: 100%;
    min-height: 400px;
    transition:
      width 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  .card:hover {
    width: 120%; /* Increase the width to 120% of its original size on hover */
    box-shadow: 0 0 10px 5px #e81899;
    border-radius: 30px;
    scale: 1.15;
    z-index: 10;
  }

  .card-contents {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .card-contents:hover {
    opacity: 1;
  }

  .pink-glow {
    filter: drop-shadow(2px 2px 1px #e81899);
  }
</style>

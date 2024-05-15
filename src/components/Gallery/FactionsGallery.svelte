<script lang="ts">
  import LockIcon from '$components/Icon/LockIcon.svelte';
  import { MOCK_FACTION_GALLERY, type GalleryItem } from '$mocks';

  export let items: GalleryItem[] = MOCK_FACTION_GALLERY;
</script>

<div class="flex flex-col gap-[60px]">
  <!-- Taiko Faction -->
  <div class="flex gap-[30px] flex-col">
    <div class="flex justify-between">
      <!-- Title text: Taiko Factions -->
      <div class="font-clash-grotesk text-secondary-brand tracking-[-1.5px] text-[75px]/[70px]">
        Taiko<br /><span class="text-base-content">Factions</span>
      </div>

      <!-- Sub text: In the vibrant world of Neo Nakuz, a groundbreaking cast of characters is emerging, centered around the electrifying ecosystem of Taiko Radio and its dynamic cast of characters: ravers, drummers, masters and more. -->
      <div class="title-body-regular text-secondary-content self-end max-w-[365px]">
        Complete all 3 steps to mint Raver Faction on mainnet launch day to enter trailblazer campaign.
      </div>
    </div>
  </div>

  <div class="f-center container gap-2">
    <!-- Cards -->
    {#each items as item, i}
      {#if item.locked}
        <div class="avatar relative max-w-full min-w-0 w-full">
          <div class="rounded-[30px] h-[400px] f-center">
            <div class="absolute z-10 w-full h-full f-center">
              <LockIcon />
            </div>
            <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
          </div>
        </div>
      {:else}
        <div class="avatar relative max-w-full min-w-0 card">
          <div class="rounded-[30px] h-[400px] f-center">
            <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
            <div
              class="absolute flex card-contents left-2 top-2 h-full w-full flex-col font-clash-grotesk display-small-medium text-white">
              {#each item.name.toUpperCase().split('') as letter, i}
                <div class="w-fit pink-glow">{letter}</div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
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

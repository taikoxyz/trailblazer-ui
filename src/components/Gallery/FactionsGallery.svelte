<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import LockIcon from '$components/Icon/LockIcon.svelte';
  import { type GalleryItem, MOCK_FACTION_GALLERY } from '$mocks';
  export let items: GalleryItem[] = MOCK_FACTION_GALLERY;

  const handleFactionsButton = () => {
    goto('/about');
  };
</script>

<!-- Taiko Faction -->
<div class="flex gap-[30px] flex-col container">
  <div class="f-center flex-col xl:flex-row xl:justify-between mb-[47px]">
    <!-- Title text: Taiko Factions -->
    <div class="font-clash-grotesk text-secondary-brand tracking-[-1.5px] text-[75px]/[70px] text-center xl:text-left">
      Taiko<br /><span class="text-base-content">Factions</span>
    </div>

    <!-- Sub text: In the vibrant world of Neo Nakuz, a groundbreaking cast of characters is emerging, centered around the electrifying ecosystem of Taiko Radio and its dynamic cast of characters: ravers, drummers, masters and more. -->
    <div class="f-col space-y-[40px]">
      <div class="title-body-regular text-secondary-content text-center xl:self-end max-w-[505px] xl:text-left">
        {$t('factions.gallery.description')}
      </div>
      <ActionButton priority="primary" class="!w-[240px]" withArrow on:click={handleFactionsButton}
        >{$t('buttons.factions.learn_about')}</ActionButton>
    </div>
  </div>
  <div class="max-w-full h-[700px] xl:h-auto">
    <div
      class="flex xl:f-center gap-2 xl:ml-0 w-full overflow-x-scroll xl:overflow-visible py-20 px-0 hide-scrollbar xl:p-0">
      <!-- Cards -->
      {#each items as item, i}
        {#if i == 0}
          <!-- spacer -->
          <div class="flex min-w-[10px] xl:min-w-0"></div>
        {/if}
        {#if item.locked}
          <div class="avatar relative xl:max-w-full xl:min-w-0 xl:w-full max-w-full min-w-[277px] w-full">
            <div class="rounded-[30px] h-[502px]">
              <div class="absolute z-10 w-full h-full f-center">
                <LockIcon />
              </div>
              <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
            </div>
          </div>
        {:else}
          <div class="avatar relative card xl:max-w-full xl:min-w-0 xl:w-full max-w-full min-w-[277px] w-full">
            <div class="rounded-[30px] h-[502px] f-center">
              <img class={item.locked ? 'blur-lg' : ''} src={item.image} alt={item.image} />
              <div
                class="absolute flex card-contents p-4 left-0 top-0 h-full w-full flex-col font-clash-grotesk display-small-medium text-white">
                {#each item.name.toUpperCase().split('') as letter}
                  <div class="w-fit pink-glow">{letter}</div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

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
    z-index: 100;
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

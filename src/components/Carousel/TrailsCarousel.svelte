<script lang="ts">
  import TrailsCarouselItem from './TrailsCarouselItem.svelte';
  import type { CarouselItem } from './types';

  export let carouselElement: HTMLDivElement;

  export let carouselItems: CarouselItem[] = [
    {
      id: '1',
      title: 'Introducing Trailblazers: Explore Taiko and get rewarded',
      description: 'Description 1',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 1,
      tag: '',
      link: 'https://taiko.mirror.xyz/MghuAEQKsqS5Y3hNtq8-9Jv93NEE_1duZKmBE6HKHRQ',
    },
  ];
</script>

<div class="flex w-full justify-center items-center gap-[12.25px]">
  <div bind:this={carouselElement} class="carousel w-full overflow-scroll rounded-box gap-8">
    {#each carouselItems as carouselItem}
      <TrailsCarouselItem {carouselItem} />
    {/each}
  </div>
</div>

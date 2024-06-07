<script lang="ts">
  import type { CarouselItem } from './types';
  import TrailsCarouselItem from './TrailsCarouselItem.svelte';

  export let carouselElement: HTMLDivElement;

  export let carouselItems: CarouselItem[] = [
    {
      id: '1',
      title: 'Title 1',
      description: 'Description 1',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 1,
    },
    {
      id: '2',
      title: 'Title 2',
      description: 'Description 2',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 2,
    },
    {
      id: '3',
      title: 'Title 3',
      description: 'Description 3',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 3,
    },
    {
      id: '4',
      title: 'Title 4',
      description: 'Description 4',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 4,
    },
    {
      id: '5',
      title: 'Title 5',
      description: 'Description 5',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 5,
    },
    {
      id: '6',
      title: 'Title 6',
      description: 'Description 6',
      image: 'https://via.placeholder.com/300',
      publishDate: new Date(),
      readTime: 6,
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

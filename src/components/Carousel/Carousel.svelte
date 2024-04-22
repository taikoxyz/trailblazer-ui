<script lang="ts">
  import { Icon } from '$components/Icon';
  import CarouselItem from './CarouselItem.svelte';

  type CarouselItem = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  let carousel: HTMLDivElement;

  function scrollLeft() {
    // Scrolls the carousel to the left
    carousel.scrollBy({ left: -600, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
  }

  function scrollRight() {
    // Scrolls the carousel to the right
    carousel.scrollBy({ left: 600, behavior: 'smooth' }); // Adjust 300 similarly
  }

  export let carouselItems: CarouselItem[] = [
    {
      id: '1',
      title: 'Title 1',
      description: 'Description 1',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '2',
      title: 'Title 2',
      description: 'Description 2',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '3',
      title: 'Title 3',
      description: 'Description 3',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '4',
      title: 'Title 4',
      description: 'Description 4',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '5',
      title: 'Title 5',
      description: 'Description 5',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '6',
      title: 'Title 6',
      description: 'Description 6',
      image: 'https://via.placeholder.com/300',
    },
  ];
</script>

<div class="flex w-full items-center gap-[12.25px]">
  <button on:click={scrollLeft} class="btn btn-circle bg-grey-5">
    <Icon type="chevron-left" class="-translate-x-[2px]"></Icon>
  </button>
  <div bind:this={carousel} class="carousel w-full overflow-scroll rounded-box gap-8">
    {#each carouselItems as carouselItem}
      <CarouselItem />
    {/each}
  </div>
  <button on:click={scrollRight} class="btn btn-circle bg-grey-5 flex items-center justify-center">
    <Icon type="chevron-right" class="translate-x-[2px]"></Icon>
  </button>
</div>

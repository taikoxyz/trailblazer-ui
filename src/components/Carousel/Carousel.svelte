<script lang="ts">
  import CarouselItem from './CarouselItem.svelte';

  type CarouselItem = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

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

<div class="carousel w-full overflow-scroll rounded-box gap-8">
  {#each carouselItems as carouselItem}
    <CarouselItem />
  {/each}
</div>

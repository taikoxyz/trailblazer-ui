<script lang="ts">
  import { TrailsCarousel } from '$components/Carousel';
  import { Icon } from '$components/Icon';

  let trails = [
    {
      tag: 'tag',
      image: 'path/to/image1.jpg',
      title: 'Decentralized and permissionless nodes, proposers, and provers',
      date: '12 Sep 2023',
      readTime: '6 min read',
    },
    {
      tag: 'tag',
      image: 'path/to/image2.jpg',
      title: "Taiko's code is open source and available on GitHub",
      date: '12 Sep 2023',
      readTime: '6 min read',
    },
    {
      tag: 'tag',
      image: 'path/to/image3.jpg',
      title: 'An Ethereum-equivalent (Type 1) zkEVM means maximum compatibility with Ethereum',
      date: '12 Sep 2023',
      readTime: '6 min read',
    },
    {
      tag: 'tag',
      image: 'path/to/image4.jpg',
      title: 'Decentralized and permissionless nodes, proposers, and provers',
      date: '12 Sep 2023',
      readTime: '6 min read',
    },
  ];

  let carouselElement: HTMLDivElement;

  function scrollLeft() {
    // Scrolls the carousel to the left
    carouselElement.scrollBy({ left: -600, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
  }

  function scrollRight() {
    // Scrolls the carousel to the right
    carouselElement.scrollBy({ left: 600, behavior: 'smooth' }); // Adjust 300 similarly
  }
</script>

<div class="flex flex-col gap-4 w-full">
  <div class="flex justify-between w-full">
    <div class="display-large-medium">Ongoing Trails</div>
    <div class="flex gap-4">
      <button class="f-center btn-circle border border-primary-brand" on:click={scrollLeft}>
        <Icon class="-translate-x-[2px]" type="chevron-left" />
      </button>
      <button class="f-center btn-circle bg-primary-brand border-primary-brand" on:click={scrollRight}>
        <Icon class="translate-x-[2px]" type="chevron-right" />
      </button>
    </div>
  </div>
  <TrailsCarousel bind:carouselElement />
</div>

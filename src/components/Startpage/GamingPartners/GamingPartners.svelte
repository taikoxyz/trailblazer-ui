<script lang="ts">
  import GamingCarousel from '$components/Carousel/GamingCarousel/GamingCarousel.svelte';
  import { Icon } from '$components/Icon';

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

<div class="flex flex-col gap-[60px] w-full">
  <div class="flex flex-col justify-between w-full gap-[40px] pl-[347px]">
    <div class="flex flex-col gap-4">
      <div class="font-clash-grotesk text-[20px]/[24.6px]">Our gaming partners</div>
      <div class="border border-primary-brand w-[66px] h-[0px]"></div>
    </div>
    <div class="flex justify-between w-full items-end">
      <div class="display-large-medium leading-[58px] gap-0">
        <span class="text-secondary-brand">Play a game</span>,<br /> earn points, and<br /> climb the ranks
      </div>
      <div class="flex gap-4">
        <button class="f-center btn-circle border border-primary-brand" on:click={scrollLeft}>
          <Icon class="-translate-x-[2px]" type="chevron-left" />
        </button>
        <button
          class="f-center btn-circle bg-primary-brand border-primary-brand hover:bg-primary-interactive-hover"
          on:click={scrollRight}>
          <Icon class="translate-x-[2px]" type="chevron-right" />
        </button>
      </div>
    </div>
  </div>
  <GamingCarousel bind:carouselElement />
</div>

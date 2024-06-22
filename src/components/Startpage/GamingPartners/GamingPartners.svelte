<script lang="ts">
  import GamingCarousel from '$components/Carousel/GamingCarousel/GamingCarousel.svelte';
  import { Icon } from '$components/Icon';
  import { isMobile } from '$libs/util/responsiveCheck';

  let carouselElement: HTMLDivElement;

  function scrollLeft() {
    if (isMobile) {
      carouselElement.scrollBy({ left: -200, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
    } else {
      carouselElement.scrollBy({ left: -600, behavior: 'smooth' }); // Adjust -300 to the size of your carousel items or desired scroll amount
    }

    // Scrolls the carousel to the left
  }

  function scrollRight() {
    if (isMobile) {
      carouselElement.scrollBy({ left: 200, behavior: 'smooth' }); // Adjust 300 similarly
    } else {
      carouselElement.scrollBy({ left: 600, behavior: 'smooth' }); // Adjust 300 similarly
    }
    // Scrolls the carousel to the right
  }
</script>

<div class="flex flex-col gap-6 xl:gap-[60px] w-full">
  <div class="flex flex-col justify-between w-full gap-[40px] xl:pl-[347px] items-center xl:items-start">
    <div class="flex flex-col gap-4 items-center xl:items-start">
      <div class="font-clash-grotesk text-[20px]/[24.6px]">Our gaming partners</div>
      <div class="border border-primary-brand w-[66px] h-[0px]"></div>
    </div>
    <div class="flex justify-between w-full xl:items-end flex-col xl:flex-row items-center gap-4">
      <div class="display-large-medium leading-[58px] gap-0 text-center xl:text-left">
        <span class="text-secondary-brand">Play a game</span>,<br class="hidden xl:block" /> earn points, and<br
          class="hidden xl:block" /> climb the ranks
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

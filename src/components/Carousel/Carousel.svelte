<!-- Carousel.svelte -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Icon } from '$components/Icon';
  import { isMobile } from '$libs/util/responsiveCheck';
  import { CarouselItem } from '.';
  import type { CarouselItemType } from './types';
  import { browser } from '$app/environment';

  export let carouselItems: CarouselItemType[] = [];

  let carouselElement: HTMLDivElement;
  let carouselWrapper: HTMLDivElement;
  let atStart = true;
  let atEnd = false;
  let showControls = true;
  let itemWidth = '350px';

  function scrollLeft() {
    const scrollAmount = isMobile ? -200 : -600;
    carouselElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  function scrollRight() {
    const scrollAmount = isMobile ? 200 : 600;
    carouselElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  function checkScrollPosition() {
    atStart = carouselElement?.scrollLeft === 0;
    atEnd = carouselElement?.scrollLeft + carouselElement?.offsetWidth >= carouselElement?.scrollWidth;
    showControls = carouselElement?.scrollWidth > carouselElement?.offsetWidth;
  }

  function updateItemWidth() {
    if (carouselWrapper && carouselItems.length > 0) {
      const availableWidth = carouselWrapper.offsetWidth - 100;
      if (carouselItems.length <= 3) {
        const calculatedWidth = Math.floor(availableWidth / carouselItems.length);
        itemWidth = `${Math.max(350, calculatedWidth)}px`;
      } else {
        itemWidth = '350px';
      }
    }
  }

  $: checkScrollPosition();

  onMount(() => {
    carouselElement?.addEventListener('scroll', checkScrollPosition);
    if (browser) window.addEventListener('resize', updateItemWidth);
    checkScrollPosition();
    updateItemWidth();
  });

  onDestroy(() => {
    carouselElement?.removeEventListener('scroll', checkScrollPosition);
    if (browser) window.removeEventListener('resize', updateItemWidth);
  });
</script>

<div class="flex gap-4 justify-center xl:justify-end h-full bottom-0 my-[40px]">
  <div class="flex gap-4">
    <button
      class={`f-center btn-circle border border-primary-brand ${atStart ? '' : 'bg-primary-brand  hover:bg-primary-interactive-hover'}`}
      on:click={scrollLeft}
      disabled={atStart}>
      <Icon class="-translate-x-[2px]" type="chevron-left" />
    </button>
    <button
      class={`f-center btn-circle border border-primary-brand ${atEnd ? '' : ' bg-primary-brand hover:bg-primary-interactive-hover'}`}
      on:click={scrollRight}
      disabled={atEnd}>
      <Icon class="translate-x-[2px]" type="chevron-right" />
    </button>
  </div>
</div>

<div bind:this={carouselWrapper} class="w-full px-[20px]">
  <div bind:this={carouselElement} class="flex carousel w-full overflow-scroll rounded-box gap-4 lg:gap-8">
    {#each carouselItems as carouselItem}
      <CarouselItem {carouselItem} width={itemWidth} />
    {/each}
  </div>
</div>

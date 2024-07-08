<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Icon } from '$components/Icon';
  import { isMobile } from '$libs/util/responsiveCheck';

  import { CarouselItem } from '.';
  import type { CarouselItemType } from './types';

  export let carouselItems: CarouselItemType[] = [];

  let carouselElement: HTMLDivElement;
  let atStart = true;
  let atEnd = false;

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
    atEnd = carouselElement?.scrollLeft + carouselElement?.clientWidth >= carouselElement?.scrollWidth;
  }

  $: checkScrollPosition();

  onMount(() => {
    carouselElement?.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
  });

  onDestroy(() => {
    carouselElement?.removeEventListener('scroll', checkScrollPosition);
  });
</script>

<div class="flex gap-4 justify-center xl:justify-end h-full bottom-0">
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

<div class="flex w-full justify-center items-center gap-[12.25px] pl-4 xl:pl-0">
  <div bind:this={carouselElement} class="carousel w-full overflow-scroll rounded-box gap-8">
    {#each carouselItems as carouselItem}
      <CarouselItem {carouselItem} />
    {/each}
  </div>
</div>

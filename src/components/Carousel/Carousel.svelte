<!-- Carousel.svelte -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { Icon } from '$components/Icon';
  import { classNames } from '$libs/util/classNames';
  import { isMobile } from '$libs/util/responsiveCheck';

  import { CarouselItem } from '.';
  import type { CarouselItemType } from './types';

  export let carouselItems: CarouselItemType[] = [];

  export let title: string | undefined = undefined;

  let carouselElement: HTMLDivElement;
  let carouselWrapper: HTMLDivElement;
  let atStart = true;
  let atEnd = false;
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

<div class={classNames('flex', 'flex-col', 'justify-center', 'items-center', 'w-full')}>
  <div class="w-full flex gap-4 justify-between items-between h-full bottom-0 mb-[40px]">
    <div class={classNames('absolute', 'left-0', 'flex-row', 'flex', 'justify-between', 'items-center', 'w-full')}>
      {#if title}
        <div class="flex flex-col justify-start gap-[40px]">
          <div class="flex flex-col gap-[20px] items-start xl:items-start">
            <div class="font-clash-grotesk text-[40px]/[49.2px]">{title}</div>
            <div class={`border border-primary-brand w-[66px] h-[0px]`}></div>
          </div>
        </div>
      {/if}

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
  </div>
  <div bind:this={carouselWrapper} class="w-full pt-[100px] md:pt-[70px]">
    <div bind:this={carouselElement} class="flex carousel w-full overflow-scroll rounded-box gap-4 lg:gap-8">
      {#each carouselItems as carouselItem}
        <CarouselItem {carouselItem} width={itemWidth} />
      {/each}
    </div>
  </div>
</div>

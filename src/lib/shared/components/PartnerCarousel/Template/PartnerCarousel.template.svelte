<script lang="ts">
  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';

  import CarouselItem from './CarouselItem.template.svelte';
  import type { PartnerCarouselItem } from './types';

  export let carouselItems: PartnerCarouselItem[] = [];

  export let title: string | undefined = 'Boost your Taiko score';
  export let headline: string | undefined = 'Boost your Taiko score';
  export let description: string | undefined = '';

  let currentIndex = 0;
  let isAnimating = false;
  const animationDuration = 500;

  let startX = 0;
  let deltaX = 0;
  let isDragging = false;
  let threshold = 50;

  $: N = carouselItems.length;

  $: styles = carouselItems.map((_, idx) => {
    const relativeIndex = (idx - currentIndex + N) % N;
    let transform = '';
    let opacity = 0;
    let zIndex = 1;
    let visibility = 'hidden';
    let blur = 4;
    let filter = 'blur(5px)';

    if (relativeIndex === 0) {
      // Center card
      transform = 'translate(-50%, -50%) scale(1)';
      opacity = 1;
      zIndex = 2;
      visibility = 'visible';
      blur = 0;
      filter = 'blur(0)';
    } else if (relativeIndex === N - 1) {
      // Left card
      transform = 'translate(-145%, -50%) translateZ(-200px) scale(0.8)';
      opacity = 0.5;
      visibility = 'visible';
      blur = 5;
      filter = 'blur(5px)';
    } else if (relativeIndex === 1) {
      // Right card
      transform = 'translate(45%, -50%) translateZ(-200px) scale(0.8)';
      opacity = 0.5;
      visibility = 'visible';
      blur = 5;
      filter = 'blur(5px)';
    } else {
      // Hidden cards
      transform = 'translate(-50%, -50%) translateZ(-400px) scale(0.6)';
      opacity = 0;
      visibility = 'hidden';
      blur = 0;
      filter = 'blur(0)';
    }

    return {
      transform,
      opacity,
      zIndex,
      visibility,
      blur,
      filter,
    };
  });

  const rotateLeft = async () => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex + 1) % N;
    await new Promise((r) => setTimeout(r, animationDuration));
    isAnimating = false;
  };

  const rotateRight = async () => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex - 1 + N) % N;
    await new Promise((r) => setTimeout(r, animationDuration));
    isAnimating = false;
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (isAnimating) return;
    isDragging = true;
    startX = event.clientX;

    (event.target as Element).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging) return;
    deltaX = event.clientX - startX;
  };

  const handlePointerUp = (event: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        rotateRight();
      } else {
        rotateLeft();
      }
    }
    deltaX = 0;
    (event.target as Element).releasePointerCapture(event.pointerId);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (isAnimating) return;
    isDragging = true;
    startX = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging) return;
    deltaX = event.touches[0].clientX - startX;
    event.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        rotateRight();
      } else {
        rotateLeft();
      }
    }
    deltaX = 0;
  };

  $: displayButtonNav = carouselItems.length > 1;

  const carouselWrapperClasses = classNames('flex', 'justify-center', 'items-center', 'w-full', '');

  const commonButtonClasses = classNames(
    'rounded-full',
    'bg-primary-interactive-accent',
    'hover:bg-primary-brand-hover',
    'min-w-[50px]',
    'min-h-[50px]',
    'flex',
    'justify-center',
    'items-center',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  );

  const hiddenButtonClasses = classNames(
    'hidden',
    'md:flex',
    'items-center',
    'justify-center',
    'min-w-[50px]',
    'min-h-[50px]',
    'rounded-full',
    'bg-primary-interactive-accent',
    'hover:bg-primary-brand-hover',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'absolute',
    'top-1/2',
    '-translate-y-1/2',
    'z-10',
  );

  const titleSectionClasses = classNames(
    'flex',
    'flex-col',
    'gap-10',
    'w-full',
    'md:min-w-[400px]',
    'md:w-[400px]',
    'self-start',
    'justify-center',
    'md:justify-start',
    'xl:w-[600px]',
    'xl:mr-[50px]',
  );

  const titleTextClasses = classNames('text-[20px]', 'text-white', 'font-clash-grotesk');

  const headlineSpanClasses = classNames(
    'text-[45px]',
    'font-semi-bold',
    'text-white',
    'leading-tight',
    'font-clash-grotesk',
    'text-center',
    'md:text-left',
  );

  const carouselContainerClasses = classNames(
    'relative',
    'w-full',
    'flex',
    'justify-end',
    'items-center',
    'md:mt-[50px]',
    'lg:min-w-[472px]',
    'lg:overflow-hidden',
    'xl:w-[920px]',
  );

  const perspectiveClasses = classNames(
    'relative',
    'w-[1024px]',
    'h-[350px]',
    'perspective-[1000px]',
    'xl:w-[920px]',
    'xl:overflow-hidden',
  );

  const mobileNavClasses = classNames(
    'md:hidden',
    'flex',
    'gap-4',
    'justify-center',
    'w-full',
    'mb-[40px]',
    'mt-[50px]',
  );
</script>

<div class={carouselWrapperClasses}>
  <div class="w-full f-col lg:f-row justify-between items-center relative h-full mb-10">
    <!-- Title Section -->
    {#if title}
      <div class={titleSectionClasses}>
        <div class="flex flex-col gap-5 items-center md:items-start">
          <div class={titleTextClasses}>{title}</div>
          <div class="border border-primary-brand w-16" />
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <span class={headlineSpanClasses}>{@html headline}</span>
          <p class="text-secondary-content text-center md:text-left">
            {description}
          </p>
        </div>
      </div>
    {/if}

    <div class={mobileNavClasses}>
      {#if displayButtonNav}
        <!-- Navigation Buttons (Mobile - centered above) -->
        <button class={commonButtonClasses} on:click={rotateLeft} disabled={isAnimating}>
          <Icon type="chevron-left" />
        </button>
        <button class={commonButtonClasses} on:click={rotateRight} disabled={isAnimating}>
          <Icon type="chevron-right" />
        </button>
      {/if}
    </div>

    <!-- Carousel Container with Desktop Navigation -->
    <div class={carouselContainerClasses}>
      {#if displayButtonNav}
        <!-- Left Navigation Button (Desktop only) -->
        <button class={hiddenButtonClasses} style="right: calc(50% + 186px)" on:click={rotateLeft}>
          <Icon type="chevron-left" />
        </button>

        <!-- Right Navigation Button (Desktop only) -->
        <button class={hiddenButtonClasses} style="left: calc(50% + 186px)" on:click={rotateRight}>
          <Icon type="chevron-right" />
        </button>
      {/if}

      <div
        class={perspectiveClasses}
        on:pointerdown={handlePointerDown}
        on:pointermove={handlePointerMove}
        on:pointerup={handlePointerUp}
        on:pointercancel={handlePointerUp}
        on:pointerleave={handlePointerUp}
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}>
        {#each carouselItems as item, index (index)}
          <div
            class="carousel-item absolute top-1/2 left-1/2 w-[324px] transform"
            style="
              transform: {styles[index].transform};
              opacity: {styles[index].opacity};
              z-index: {styles[index].zIndex};
              visibility: {styles[index].visibility};
              filter: {styles[index].filter};
              transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
            ">
            <CarouselItem {item} active={(index - currentIndex + N) % N === 0} blur={styles[index].blur} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

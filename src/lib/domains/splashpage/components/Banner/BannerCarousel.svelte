<!-- Carousel.svelte -->
<script lang="ts">
  import { onDestroy,onMount } from 'svelte';
  import { cubicInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { classNames } from '$shared/utils/classNames';

  import type { Slide } from './types';

  export let slides: Array<Slide> = [];
  export let interval: number = 4000; // Time between slides in ms
  export let transitionDuration: number = 400; // Transition duration in ms
  export let transitionDistance: number = 300; // Distance for slide animation in px

  export let withDots: boolean = false;

  let current = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    if (timer === null && slides.length > 1) {
      timer = setInterval(() => {
        nextSlide();
      }, interval);
    }
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
  }

  function goToSlide(index: number) {
    if (index !== current) {
      current = index;
      stopTimer();
      startTimer();
    }
  }

  onMount(() => {
    if (slides.length > 1) {
      startTimer();
    }
  });

  onDestroy(() => {
    stopTimer();
  });

  const carouselClasses = classNames(
    'container',
    'relative',
    'w-full',
    'h-[732px]',
    'md:h-[427px]',
    'lg:h-[300px]',
    'xl:h-[250px]',
    'overflow-hidden',
  );
</script>

<!-- Carousel Markup -->
<div
  class={carouselClasses}
  on:mouseenter={stopTimer}
  on:mouseleave={startTimer}
  aria-label="Image Carousel"
  role="region"
  aria-roledescription="carousel">
  <!-- Slides Wrapper -->
  <div class="relative w-full h-full">
    {#if slides.length > 0}
      {#key current}
        <div
          class="carousel-slide"
          transition:fly={{
            x: transitionDistance,
            duration: transitionDuration,
            easing: cubicInOut,
          }}
          aria-hidden="false">
          <svelte:component this={slides[current].component} />
        </div>
      {/key}
    {/if}
  </div>

  {#if slides.length > 1 && withDots}
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
      role="tablist"
      aria-label="Slide navigation">
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each slides as _, index}
        <button
          class={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            index === current ? 'bg-primary-brand' : 'bg-gray-300'
          }`}
          on:click={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={index === current}
          role="tab"></button>
      {/each}
    </div>
  {/if}
</div>

<!-- Component Styles -->
<style>
  .carousel-slide {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .carousel-slide.svelte-transition-fly-enter-active,
  .carousel-slide.svelte-transition-fly-leave-active {
    transition: opacity 0.5s;
  }

  [aria-hidden='false'] {
    visibility: visible;
  }
</style>
